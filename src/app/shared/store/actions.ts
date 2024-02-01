import { Action } from '@ngrx/store';
import { Weather } from '../types/weather';

export const Types = {
  ADD_FAVORITE: "ADD_FAVORITE",
  REMOVE_FAVORITE: "REMOVE_FAVORITE",
  UPDATE_FAVORITE: "UPDATE_FAVORITE"

}

export class AddFavorite implements Action {
  public readonly type = Types.ADD_FAVORITE;
  constructor(public payload: Weather) { }
}

export class RemoveFavorite implements Action {
  public readonly type = Types.REMOVE_FAVORITE
  constructor(public payload: string) { }
}

export class UpdateFavorite implements Action {
  public readonly type = Types.UPDATE_FAVORITE
  constructor(public payload: Weather) { }
}

export type Actions = AddFavorite | RemoveFavorite | UpdateFavorite;
