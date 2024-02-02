import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Location } from '../types/Location';
import { GeolocationResponse } from '../types/geolocation-response';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    private readonly url = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

    constructor(private _http: HttpClient) {
    }

    private getGeolocation(): Promise<Location> {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(
                (response) => res({lon: response.coords.longitude, lat: response.coords.latitude}),
                (err) => rej(err)
            );
        });
    }

  private setDefaultLocation() {
      console.log('wow')
  }

    private getStateByGeolocation(lat: number, lon: number): Observable<GeolocationResponse> {
        return this._http.get<GeolocationResponse>(this.url, {
            params: {
                apikey: environment.apiKey,
                q: `${lat.toString()},${lon.toString()}`
            }
        }).pipe(
            catchError(error => {
                throw error;
            })
        );
    }

    public getCurrentLocation(): Observable<GeolocationResponse> {
        return new Observable<GeolocationResponse>(observer => {
            this.getGeolocation().then(location => {
                this.getStateByGeolocation(location.lat, location.lon).subscribe({
                    next: (response: GeolocationResponse) => {
                        observer.next(response);
                        observer.complete();
                    },
                    error: (error: any) => observer.error(error)
                });
            }).catch(error => observer.error(error));
        });
    }

}
