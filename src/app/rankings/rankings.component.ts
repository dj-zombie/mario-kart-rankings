import { Component, OnInit } from '@angular/core';
import { RankingsService } from '../shared/rankings.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsComponent implements OnInit {
  rankings: any;

  constructor(private rankingsService: RankingsService) {
    this.rankingsService.ranks.subscribe((data: any) => {
      this.rankings = data;
    });
  }

  ngOnInit(): void {}
}
