import { WeatherResponse } from './weather-reponse';
import { ForecastResponse } from './forecast-response';

export interface Weather {
  Key: string,
  state: string,
  country: string,
  currentWeather: WeatherResponse,
  forecast: ForecastResponse
}
