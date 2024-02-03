import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForecastResponse } from '../types/forecast-response';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private readonly url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';

  constructor(private http: HttpClient) {
  }

  public getForecast(locationKey: string): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(this.url + locationKey, {
      params: {
        apikey: environment.apiKey,
      }
    })
  }
}
