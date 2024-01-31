import { DayNight } from './day-night';
import { Temperature } from './temperature';

export interface Forecast {
	Date: Date,
	Day: DayNight,
	EpochDate: number,
	Link: string,
	MobileLink: string,
	Night: DayNight,
	Sources: string[],
	Temperature: {
		Maximum: Temperature,
		Minimum: Temperature
	}
}
