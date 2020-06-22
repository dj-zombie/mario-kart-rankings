import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { EloService } from '../shared/elo.service';
import { ConstantPool } from '@angular/compiler';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';

export interface Player {
  playerName: string;
  eloRating: number;
  eloDifference: number;
  gamesPlayed: number;
  pastRatings: Array<number>;
}

export interface Rankings extends Array<Player> {}

export interface PastGame {
  date: string;
  newElo: string;
  pointsDifference: number;
}

export interface Match {
  createdAt: string;
  standings: Array<string>;
}

export interface Matches {
  updatedAt: string;
  list: Array<Match>;
}

@Injectable({
  providedIn: 'root',
})
export class RankingsService {
  rankedPlayers: Array<Player>;
  private _rankings: BehaviorSubject<Array<any>> = new BehaviorSubject(
    Array([])
  );
  public readonly ranks: Observable<Array<any>> = this._rankings.asObservable();

  constructor(private apiService: ApiService, private eloService: EloService) {
    this.rankedPlayers = [];

    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.apiService.matches)
      )
      .subscribe((matches: any) => {
        matches.list.forEach((match: Match) => {
          this.addRankedGame(match.standings);
        });
        this._rankings.next(this.rankings);
      });

    /*this.apiService.matches
      .subscribe((matches: any) => {
      matches.list.forEach((match: Match) => {
        this.addRankedGame(match.standings);
      });
      this._rankings.next(this.rankings);
    });*/
  }

  get rankings(): Array<Player> {
    return this.rankedPlayers.sort((a, b) =>
      a.eloRating < b.eloRating ? 1 : -1
    );
  }

  public getFilteredRankings(): Array<Player> {
    return this.rankedPlayers.filter((player) => player.gamesPlayed >= 3);
  }

  public getPlayer(playerName: string): Player {
    return this.rankedPlayers.find(
      (player) => player.playerName === playerName
    );
  }

  public addRankedGame(rankings: Array<string>): void {
    console.log('add ranked game', rankings);

    rankings.forEach((name, i) => {
      const updatingPlayer = this.rankedPlayers.findIndex(
        (p: any) => p.playerName == name
      );
      if (updatingPlayer >= 0) {
        const oldValues = this.rankedPlayers[updatingPlayer];
        this.eloService.addPlayer(name, i, oldValues.eloRating);
      } else {
        this.eloService.addPlayer(name, i, 1000);
      }
    });
    const results = this.eloService.calculateELOs();
    results.forEach((player: any) => {
      const updatingPlayer = this.rankedPlayers.findIndex(
        (p: any) => p.playerName == player.name
      );
      if (updatingPlayer >= 0) {
        const oldValues = this.rankedPlayers[updatingPlayer];
        const newValues = {
          playerName: player.name,
          eloRating: player.eloPost,
          gamesPlayed: oldValues.gamesPlayed += 1,
          pastRatings: [...oldValues.pastRatings, player.eloPost],
        } as Player;
        this.rankedPlayers[updatingPlayer] = newValues;
      } else {
        const newPlayer = {
          playerName: player.name,
          eloRating: 1000,
          gamesPlayed: 1,
          pastRatings: [1000],
        } as Player;
        this.rankedPlayers = [...this.rankedPlayers, newPlayer];
      }
    });
    this.eloService.clearPlayers();
  }
}
