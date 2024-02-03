import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from './components/search/search.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FormsModule } from "@angular/forms";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../shared/shared.module";
import { ForecastComponent } from "./components/weather/components/forecast/forecast.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "../../shared/store/reducers";
import { localStorageSyncReducer } from "../../shared/store/meta-reducers";

@NgModule({
  declarations: [
    SearchComponent,
    WeatherComponent,
    ForecastComponent,
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
    NgOptimizedImage,
    StoreModule.forRoot(
      {favorites: reducer},
      {metaReducers: [localStorageSyncReducer]}
    )
  ]
})
export class HomeModule {
}
