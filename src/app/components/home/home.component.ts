import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../shared/services/weather.service";
import { ForecastService } from "../../shared/services/forecast.service";
import { GeolocationService } from "../../shared/services/geolocation.service";
import { ActivatedRoute } from "@angular/router";
import { Weather } from "../../shared/types/weather";
import { AutoCompleteResponse } from "../../shared/types/auto-complete-response";
import { ToastService } from "../../shared/services/toast.service";

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
    private activatedRoute: ActivatedRoute,
    public toastService: ToastService
  ) {
    this.resetWeather();
  }

  public ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['key']) {
      this.getWeatherFromRouteParams();
    } else {
      void this.getLocalWeather();
    }
  }

  private getWeatherFromRouteParams(): void {
    let params = this.activatedRoute.snapshot.queryParams;
    if (params['key'] && params['state'] && params['country']) {
      this.setWeather(params['key'], params['state'], params['country']);
    }
  }

  public async getLocalWeather(): Promise<void> {
    try {
      const result = await this.geolocationService.getCurrentLocation();
      this.setWeather(result.Key, result.LocalizedName, result.Country.LocalizedName);
    } catch (err) {
      this.toastService.showErrorToast(err.message)
    }
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
    this.weatherService.getCurrentWeather(key).toPromise().then(data => {
      this.weather.currentWeather = data[0];
    }).catch(err => this.toastService.showErrorToast(err.message));

    this.forecastService.getForecast(key).toPromise().then(data => {
      this.weather.forecast = data;
    }).catch(err => this.toastService.showErrorToast(err.message));
  }

}
