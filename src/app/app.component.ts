import { Component, OnInit } from '@angular/core';
import { ThemeService } from "./shared/services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

}
