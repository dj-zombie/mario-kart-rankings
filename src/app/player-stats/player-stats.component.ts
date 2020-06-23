import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RankingsService } from '../shared/rankings.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})
export class PlayerStatsComponent implements OnInit {
  player: any;
  options: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [],
      type: 'line'
    }],
      title: {
      text: 'Player Ranking History'
    },
      xAxis: {
      categories: ['Ranking']
    },
    yAxis: {
        title: {
            text: 'Fruit eaten'
        }
    },
  }
  constructor(
    private route: ActivatedRoute,
    private rankingsService: RankingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.player = this.rankingsService.getPlayer(id);
    const ratings = this.player.pastRatings;
    this.options = { series: [{ data: ratings }] };
    this.options.series[0].name = 'Ratings';
    Highcharts.setOptions({
      chart: {
        backgroundColor: 'rgba(255,255,255,0.9)'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: ['Game']
      },
      yAxis: {
        title: {
          text: 'Elo Rating'
        }
      },
      title: {
        text: 'Player Ranking History',
        style: {
          color: 'crimson'
        }
      }
    });
  }
}
