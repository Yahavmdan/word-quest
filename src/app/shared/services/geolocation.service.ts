import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../types/location';
import { GeolocationResponse } from "../types/geolocation-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private readonly url = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

  constructor(private http: HttpClient) {
  }

  private getGeolocation(): Promise<Location> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (response) => res({lon: response.coords.longitude, lat: response.coords.latitude}),
        (err) => rej(err)
      );
    })
  }

  private getStateByGeolocation(lat: number, lon: number): Observable<GeolocationResponse> {
    return this.http.get<GeolocationResponse>(this.url, {
      params: {
        apikey: environment.apiKey,
        q: `${lat.toString()},${lon.toString()}`
      }
    });
  }

  public async getCurrentLocation(): Promise<Observable<GeolocationResponse>> {
    const location = await this.getGeolocation();
    return this.getStateByGeolocation(location.lat, location.lon);
  }
}
