import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WeatherActions from '../../../../../shared/store/actions';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WeatherService } from "../../../../../shared/services/weather.service";
import { ForecastService } from "../../../../../shared/services/forecast.service";
import { WeatherHelper } from "../../../../../shared/utilities/weather-helper";
import { Weather } from "../../../../../shared/types/weather";

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {

  @Input()
  public weather: Weather;

  constructor(
    private _store: Store,
    private _router: Router,
    private _weatherService: WeatherService,
    private _forecastService: ForecastService,
    public toastService: ToastService,
    public weatherHelper: WeatherHelper
  ) {
  }

  public ngOnInit(): void {
    this.updateFavorite(this.weather);
  }

  public removeFavorite(): void {
    this._store.dispatch(new WeatherActions.RemoveFavorite(this.weather.Key))
  }

  public updateFavorite(favorite: Weather) {
    try {
      let lastUpdate = new Date(favorite.currentWeather.LocalObservationDateTime);
      let today = new Date(Date.now());
      if (today.getTime() - lastUpdate.getTime() > 1000 * 60 * 60 * 24) {
        let updatedFavorite: Weather = {
          Key: favorite.Key,
          state: favorite.state,
          country: favorite.country,
          currentWeather: null,
          forecast: null
        }
        Promise.all([
          this._weatherService.getCurrentWeather(favorite.Key).toPromise(),
          this._forecastService.getForecast(favorite.Key).toPromise()
        ]).then(results => {
          updatedFavorite.currentWeather = results[0][0];
          updatedFavorite.forecast = results[1];
          this._store.dispatch(new WeatherActions.UpdateFavorite(favorite))
        })
      }
    } catch (err) {
      this.toastService.showErrorToast(err.message);
    }
  }

  public getFullWeatherPage(): void {
    void this._router.navigate(['search'], {
      queryParams: {
        key: this.weather.Key,
        state: this.weather.state,
        country: this.weather.country
      }
    })
  }

}
