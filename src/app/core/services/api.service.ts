import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Constants } from 'src/app/config/constants';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cache$: Observable<Array<any>>;
  constructor(
    private apiHttpService: ApiHttpService,
    private constants: Constants
  ) {}

  get matches() {
    // if (!this.cache$) {
    //   this.cache$ = this.getMatches().pipe(shareReplay(1));
    // }
    // return this.cache$;
    return this.getMatches();
  }

  private getMatches(): Observable<any> {
    return this.apiHttpService.get(`${this.constants.API_ENDPOINT}/matches`);
  }

  public addMatch(match: any): Observable<any> {
    return this.apiHttpService.post(
      `${this.constants.API_ENDPOINT}/matches`,
      match
    );
  }
}
