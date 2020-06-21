import { Component, OnInit } from '@angular/core';
import { RankingsService, Rankings } from '../shared/rankings.service';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { concatMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsComponent implements OnInit {
  rankings$: Observable<Rankings>;
  polledRankings$: Observable<any>;

  constructor(private rankingsService: RankingsService) {
  }

  ngOnInit(): void {
    const rankings$ = this.rankingsService.ranks;
    this.polledRankings$ = timer(0, 5000).pipe(
      tap(ev => console.log('polling...', ev)),
      concatMap(_ => rankings$),
        map((response: []) => response),
    );

    this.rankings$ = this.rankingsService.ranks
  }
}
