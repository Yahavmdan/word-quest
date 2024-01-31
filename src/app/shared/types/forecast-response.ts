import { Forecast } from './forecast';
import { ForecastHeadline } from './forecast-headline';

export interface ForecastResponse {
  DailyForecasts: Forecast[],
	Headline: ForecastHeadline
}
