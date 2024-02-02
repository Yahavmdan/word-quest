import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../shared/services/weather.service";
import { ForecastService } from "../../shared/services/forecast.service";
import { GeolocationService } from "../../shared/services/geolocation.service";
import { Weather } from "../../shared/types/weather";
import { AutoCompleteResponse } from "../../shared/types/auto-complete-response";
import { ToastService } from "../../shared/services/toast.service";
import { GeolocationResponse } from "../../shared/types/geolocation-response";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public weather: Weather;

  constructor(
    private weatherService: WeatherService,
    private forecastService: ForecastService,
    private geolocationService: GeolocationService,
    public toastService: ToastService
  ) {
    this.resetWeather();
  }

  public ngOnInit(): void {
    void this.getLocalWeather();
  }

  public getLocalWeather(): void {
    this.geolocationService.getCurrentLocation().subscribe({
      next: (result: GeolocationResponse) => {
        this.setWeather(result.Key, result.LocalizedName, result.Country.LocalizedName);
      },
      error: (error: {code: number, message: string}) => {
        // setting Tel Aviv as a default first view if user denied access to location.
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
      this.weatherService.getCurrentWeather(key),
      this.forecastService.getForecast(key)
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
