import { Component, OnInit } from '@angular/core';
import {ApiHttpService } from '../../core/services/api-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private apiHttpService: ApiHttpService) { }

  ngOnInit(): void {
    this.apiHttpService
      .get('http://127.0.0.1:3000/matches')
      .subscribe((data) => {
        console.log('Matches', data);
      });
  }

}
