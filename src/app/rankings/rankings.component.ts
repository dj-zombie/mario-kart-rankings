import { Component, OnInit } from '@angular/core';
import { RankingsService, Rankings } from '../shared/rankings.service';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { concatMap, map, tap } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsComponent implements OnInit {
  rankings$: Observable<Rankings>;
  polledRankings$: Observable<any>;

  constructor(private rankingsService: RankingsService) {}

  ngOnInit(): void {
    this.polledRankings$ = interval(5000).pipe(
      tap((ev) => console.log('polling...', ev)),
      startWith(0),
      switchMap(() => this.rankingsService.ranks)
    );
    this.rankings$ = this.rankingsService.ranks;
  }
}
