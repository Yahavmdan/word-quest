import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WeatherActions from '../../../../shared/store/actions';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WeatherService } from "../../../../shared/services/weather.service";
import { ForecastService } from "../../../../shared/services/forecast.service";
import { WeatherHelper } from "../../../../shared/utilities/weather-helper";
import { Weather } from "../../../../shared/types/weather";
import { catchError, forkJoin, mergeMap, of } from "rxjs";

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
    this._store.dispatch(new WeatherActions.RemoveFavorite(this.weather.Key));
  }

  public updateFavorite(favorite: Weather) {
    try {
      if (this.isUpdateRequired(favorite)) {
        this.fetchAndUpdateFavorite(favorite);
      }
    } catch (err) {
      this.handleUpdateError(err);
    }
  }

  private isUpdateRequired(favorite: Weather): boolean {
    const lastUpdate = new Date(favorite.currentWeather.LocalObservationDateTime);
    const today = new Date(Date.now());
    return today.getTime() - lastUpdate.getTime() > 1000 * 60 * 60 * 24;
  }

  private fetchAndUpdateFavorite(favorite: Weather): void {
    const updatedFavorite: Weather = {
      Key: favorite.Key,
      state: favorite.state,
      country: favorite.country,
      currentWeather: null,
      forecast: null
    };

    forkJoin([
      this._weatherService.getCurrentWeather(favorite.Key),
      this._forecastService.getForecast(favorite.Key)
    ]).pipe(
        mergeMap(results => {
          updatedFavorite.currentWeather = results[0][0];
          updatedFavorite.forecast = results[1];
          this._store.dispatch(new WeatherActions.UpdateFavorite(favorite));
          return of(updatedFavorite);
        }),
        catchError(err => {
          this.handleUpdateError(err);
          return of(updatedFavorite);
        })
    ).subscribe();
  }

  private handleUpdateError(error: any): void {
    this.toastService.showErrorToast(error.message);
  }

}
