import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from './components/search/search.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FormsModule } from "@angular/forms";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../shared/shared.module";
import { ForecastComponent } from "./components/weather/forecast/forecast.component";
import { FavoriteItemComponent } from "./components/weather/favorite-item/favorite-item.component";

@NgModule({
  declarations: [
    SearchComponent,
    WeatherComponent,
    ForecastComponent,
    FavoriteItemComponent
  ],
  exports: [
    SearchComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbTypeahead,
    SharedModule,
    NgOptimizedImage
  ]
})
export class HomeModule { }
