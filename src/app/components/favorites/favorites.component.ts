import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Weather } from "../../shared/types/weather";
import { FavoritesState } from "../../shared/store/state";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {

  public readonly favorites$: Observable<Weather[]>

  constructor(private _store: Store<FavoritesState>) {
    this.favorites$ = this._store.select('favorites');
  }

}
