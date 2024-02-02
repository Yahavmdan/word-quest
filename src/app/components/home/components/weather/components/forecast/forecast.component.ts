import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {

  @Input()
  public iconUrl: string;
  @Input()
  public text: string;
  @Input()
  public tempRange: string;
  @Input()
  public date: Date;
}
