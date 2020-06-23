import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {
  matchForm = new FormGroup({
    firstPlace: new FormControl('', [Validators.required]),
    secondPlace: new FormControl('', [Validators.required]),
    thirdPlace: new FormControl('', [Validators.required]),
    fourthPlace: new FormControl('', [Validators.required]),
  });
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public addMatch() {
    const standings = [
      this.matchForm.value.firstPlace,
      this.matchForm.value.secondPlace,
      this.matchForm.value.thirdPlace,
      this.matchForm.value.fourthPlace
    ];
    const match = {
      standings,
      createdAt: new Date().toISOString()
    }
    this.apiService.addMatch(match).subscribe(() => {
      this.router.navigate(['rankings']);
    });
  }
}
