import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Weather } from "../../shared/types/weather";
import { FavoritesState } from "../../shared/store/state";
import { fade, glideY } from 'src/app/shared/utilities/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  animations: [fade('fade', 500),
    glideY('glide', -20, 500)]
})
export class FavoritesComponent {

  public readonly favorites$: Observable<Weather[]>

  constructor(private _store: Store<FavoritesState>) {
    this.favorites$ = this._store.select('favorites');
  }

}
