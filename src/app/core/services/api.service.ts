import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Constants } from 'src/app/config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private constants: Constants
  ) {}

  public getMatches():Observable<any> {
    return this.apiHttpService.get(`${this.constants.API_ENDPOINT}/matches`)
  }

  public addMatch(match: any):Observable<any> {
    return this.apiHttpService.post(`${this.constants.API_ENDPOINT}/matches`, match)
  }
}
