import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from './components/search/search.component';
import { WeatherComponent } from './components/weather/weather.component';

@NgModule({
  declarations: [
    SearchComponent,
    WeatherComponent
  ],
  exports: [
    SearchComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class HomeModule { }
