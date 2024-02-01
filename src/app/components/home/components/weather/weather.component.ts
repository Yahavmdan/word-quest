import { Component, Input, OnInit } from '@angular/core';
import { Weather } from "../../../../shared/types/weather";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { FavoritesState } from "../../../../shared/store/state";
import { WeatherHelper } from "../../../../shared/utilities/weather-helper";
import * as WeatherActions from '../../../../shared/store/actions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  @Input()
  public weather: Weather
  public isCelsiusType: boolean = true;
  public readonly favorites$: Observable<Weather[]>;
  public favorites: Weather[];

  constructor(
    private store: Store<FavoritesState>,
    public weatherHelper: WeatherHelper
  ) {
    this.favorites$ = this.store.select('favorites')
  }

  public ngOnInit(): void {
    this.favorites$.subscribe(result => this.favorites = result);
  }

  public setTemperatureType(value: boolean): void {
    this.isCelsiusType = value;
  }

  public addFavorite(): void {
    this.store.dispatch(new WeatherActions.AddFavorite(this.weather))
  }

  public removeFavorite(): void {
    this.store.dispatch(new WeatherActions.RemoveFavorite(this.weather.Key))
  }

  public isFavorite(): boolean {
    return this.favorites.findIndex(fav => fav.Key === this.weather.Key) >= 0;
  }

}
