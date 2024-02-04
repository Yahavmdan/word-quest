import { Component, OnInit } from '@angular/core';
import { ThemeService } from "./shared/services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isDarkMode: boolean;

  constructor(private _themeService: ThemeService) {
  }

  ngOnInit(): void {
    this._themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

}
