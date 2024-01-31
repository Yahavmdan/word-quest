import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../shared/services/weather.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private weather: WeatherService) {
  }
  ngOnInit(): void {
  // this.getWeather();
  }

  private getWeather(): void {
    this.weather.getCurrentWeather('215793').subscribe(res => {
      console.log(res)
    })
  }

}
