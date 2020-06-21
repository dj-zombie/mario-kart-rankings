import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Player {
  playerName: string;
  eloRating: number;
  gamesPlayed: number;
  pastRatings: Array<number>;
  history: Array<PastGame>;
}

export interface PastGame {
  date: string;
  newElo: string;
  pointsDifference: number;
}

@Injectable({
  providedIn: 'root',
})
export class RankingsService {
  rankedPlayers: any[];
  private _rankings: BehaviorSubject<Array<any>> = new BehaviorSubject(
    Array([])
  );
  public readonly ranks: Observable<Array<any>> = this._rankings.asObservable();

  constructor(private apiService: ApiService) {
    this.rankedPlayers = [];
    this.apiService.matches.subscribe((matches: any) => {
      matches.list.forEach((match: any) => {
        this.addRankedGame(match.standings);
      });
      this._rankings.next(this.rankings);
    });
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
    rankings.forEach((name) => {
      const updatingPlayer = this.rankedPlayers.findIndex(
        (p: any) => p.playerName == name
      );
      if (updatingPlayer >= 0) {
        const oldValues = this.rankedPlayers[updatingPlayer];
        const newElo = oldValues.eloRating + 32;
        const newValues = {
          playerName: name,
          eloRating: newElo,
          gamesPlayed: oldValues.gamesPlayed += 1,
          pastRatings: [...oldValues.pastRatings, newElo],
        } as Player;
        this.rankedPlayers[updatingPlayer] = newValues;
      } else {
        const player = {
          playerName: name,
          eloRating: 1000,
          gamesPlayed: 1,
          pastRatings: [1000],
        } as Player;
        this.rankedPlayers = [...this.rankedPlayers, player];
      }
    });
  }
}
