import { Temperature } from './temperature';;

export interface WeatherResponse {
  EpochTime: number,
  HasPrecipitation: boolean,
  IsDayTime: boolean,
  Link: string,
  LocalObservationDateTime: Date,
  MobileLink: string,
  PrecipitationType?: string,
  Temperature: {
    Metric: Temperature,
    Imperial: Temperature
  },
  WeatherIcon: number,
  WeatherText: string
}
