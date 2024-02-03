import { Forecast } from './forecast';
import { ForecastHeadline } from './forecast-headline';

export type ForecastResponse = {
  DailyForecasts: Forecast[],
	Headline: ForecastHeadline
}
