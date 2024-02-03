import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AutoCompleteResponse } from '../types/auto-complete-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  private readonly url = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';

  constructor(private _http: HttpClient) {
  }

  public getAutoComplete(value: string): Observable<AutoCompleteResponse[]> {
    return this._http.get<AutoCompleteResponse[]>(this.url, {
      params: {
        apikey: environment.apiKey,
        q: value
      }
    })
  }
}
