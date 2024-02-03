import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';
import { Weather } from '../types/weather';

export function localStorageSyncReducer(reducer: ActionReducer<{ favorites: Weather[] }>): ActionReducer<any> {
  return localStorageSync({keys: ['favorites'], rehydrate: true})(reducer);
}
