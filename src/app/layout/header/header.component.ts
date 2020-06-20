import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMatches().subscribe((data) => {
      console.log('Matches', data);
    });

    const match = {"createdAt":"2021-06-15T09:49:51.299Z","standings":["Zombie","Villager","Mario","Luigi"]}
    this.apiService.addMatch(match).subscribe((data) => {
      console.log('new match submitted', data);
    });
  }

}
