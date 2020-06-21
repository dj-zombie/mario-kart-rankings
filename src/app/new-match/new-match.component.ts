import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {
  numOfPlayers: number = 4;
  place = [];
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    for (let i=0; i < this.numOfPlayers; i++) {
      this.place[i] = new FormControl('', [Validators.required]);
      console.log('i', i);
    }
  }

  public iterator(n: number): number[] {
    return [...Array(n).keys()];
  }

  public getErrorMessage(i: number) {
    if (this.place[i].hasError('required')) {
      return 'You must enter a value';
    }
  }

  public addMatch() {
    let standings = [];
    for (let i=0; i < this.numOfPlayers; i++) {
      standings = [...standings, this.place[i].value];
    }
    const match = {
      standings,
      createdAt: '2021-06-15T09:49:51.299Z'
    }
    console.log('sending', match);
    this.apiService.addMatch(match).subscribe(() => {
      console.log('new match submitted');
      this.router.navigate(['rankings']);
    });
  }
}
