import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _isDarkMode = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('theme')).darkMode);
  public isDarkMode$ = this._isDarkMode.asObservable();

  public toggleMode(): void {
    localStorage.setItem('theme', JSON.stringify({darkMode: !this._isDarkMode.value}));
    this._isDarkMode.next(!this._isDarkMode.value);
  }

}
