import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../types/weather-reponse';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly url: string = 'https://dataservice.accuweather.com/currentconditions/v1/';

  constructor(private _http: HttpClient) {
  }

  public getCurrentWeather(locationKey: string): Observable<WeatherResponse[]> {
    return this._http.get<WeatherResponse[]>(this.url + locationKey, {
      params: {
        apikey: environment.apiKey
      }
    })
  }
}
