import { Injectable } from '@angular/core';
import { Weather } from '../types/weather';
import { Temperature } from '../types/temperature';
import { Forecast } from '../types/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherHelper {

  public isDayTime(weather: Weather): boolean {
    return weather.currentWeather.IsDayTime;
  }

  public getForecastIcon(weather: Weather, forecastIndex: number): string {
    let forecast = weather.forecast.DailyForecasts[forecastIndex];
    if (this.isDayTime(weather)) {
      return this.getWeatherIconLink(forecast.Day.Icon)
    }
    return this.getWeatherIconLink(forecast.Night.Icon)
  }

  public getWeatherIconLink(iconNumber: number): string {
    let str = iconNumber > 9 ? iconNumber : `0${iconNumber}`;
    return `https://developer.accuweather.com/sites/default/files/${str}-s.png`
  }

  public getCTemperatureString(temperature: Temperature): string {
    let val: number;
    if (temperature.Unit === "C") {
      val = temperature.Value
    } else {
      val = (temperature.Value - 32) * 5 / 9;
    }
    return `${val.toFixed(0)}\u00B0C`;
  }

  public getFTemperatureString(temperature: Temperature): string {
    let val: number;
    if (temperature.Unit === "F") {
      val = temperature.Value
    } else {
      val = (temperature.Value - 32) * 9 / 5 + 32;
    }
    return `${val.toFixed(0)}\u00B0F`;
  }

  public getTemperatureRange(forecast: Forecast, isCelsiusType: boolean): string {
    let minimum: string;
    let maximum: string;
    if (isCelsiusType) {
      minimum = this.getCTemperatureString(forecast.Temperature.Minimum)
      maximum = this.getCTemperatureString(forecast.Temperature.Maximum)
    } else {
      minimum = this.getFTemperatureString(forecast.Temperature.Minimum)
      maximum = this.getFTemperatureString(forecast.Temperature.Maximum)
    }
    return `${minimum} - ${maximum}`;
  }

  public getCurrentForecastText(weather: Weather, forecastIndex: number): string {
    const forecast = weather.forecast.DailyForecasts[forecastIndex];
    if (this.isDayTime(weather)) {
      return forecast.Day.IconPhrase;
    }
    return forecast.Night.IconPhrase;
  }

}
