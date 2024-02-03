import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../shared/services/weather.service";
import { ForecastService } from "../../shared/services/forecast.service";
import { GeolocationService } from "../../shared/services/geolocation.service";
import { Weather } from "../../shared/types/weather";
import { AutoCompleteResponse } from "../../shared/types/auto-complete-response";
import { ToastService } from "../../shared/services/toast.service";
import { GeolocationResponse } from "../../shared/types/geolocation-response";
import { forkJoin } from "rxjs";
import { fade, glideY } from "../../shared/utilities/animations";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [    fade('fade',500),
    glideY('glide',-20,500)]
})
export class HomeComponent implements OnInit {

  public weather: Weather;

  constructor(
    private _route: ActivatedRoute,
    private _weatherService: WeatherService,
    private _forecastService: ForecastService,
    private _geolocationService: GeolocationService,
    public toastService: ToastService
  ) {
    this.resetWeather();
  }

  public ngOnInit(): void {
    this.setInitialWeather();
  }

  private setInitialWeather(): void {
    this._route.queryParamMap.subscribe(res => {
      if (res.keys.length) {
        this.setWeatherFromRouteParams();
        return;
      }
      void this.getLocalWeather();
    });
  }

  private setWeatherFromRouteParams(): void {
    const params = this._route.snapshot.queryParams;
    this.setWeather(params[0], params[1], params[2]);
  }

  public getLocalWeather(): void {
    this._geolocationService.getCurrentLocation().subscribe({
      next: (result: GeolocationResponse) => {
        this.setWeather(result.Key, result.LocalizedName, result.Country.LocalizedName);
      },
      error: (error: {code: number, message: string}) => {
        // sets Tel Aviv as a default first view if user denied access to location.
        this.setWeather('215854', 'Tel Aviv', 'Israel');
        this.toastService.showErrorToast(error.message);
      }
    });
  }

  private resetWeather(): void {
    this.weather = {Key: null, state: null, country: null, currentWeather: null, forecast: null};
  }

  public get isWeatherLoaded(): boolean {
    for (let key in this.weather) {
      if (this.weather[key] == null) {
        return false
      }
    }
    return true
  }

  public onSearch(state: AutoCompleteResponse): void {
    this.setWeather(state.Key, state.LocalizedName, state.Country.LocalizedName);
  }

  public setWeather(key: string, state: string, country: string): void {
    this.resetWeather();
    this.weather.Key = key;
    this.weather.state = state;
    this.weather.country = country;
    this.setWeatherDataByKey(key);
  }

  private setWeatherDataByKey(key: string): void {
    forkJoin([
      this._weatherService.getCurrentWeather(key),
      this._forecastService.getForecast(key)
    ]).subscribe({
      next: ([currentWeatherData, forecastData]) => {
        this.weather.currentWeather = currentWeatherData[0];
        this.weather.forecast = forecastData;
      },
      error: (error) => {
        this.toastService.showErrorToast(error.message);
      }
    });
  }

}
