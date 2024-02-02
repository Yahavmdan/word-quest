import * as WeatherActions from './actions';
import { Weather } from '../types/weather';

export function reducer(state: Weather[] = [], action: WeatherActions.Actions): Weather[] {
    switch (action.type) {
        case WeatherActions.Types.ADD_FAVORITE:
            return [...state, action.payload as Weather];

        case WeatherActions.Types.REMOVE_FAVORITE:
            return state.filter(weather => weather.Key !== action.payload);

        case WeatherActions.Types.UPDATE_FAVORITE:
            let index = state.map(weather => weather.Key)
                .indexOf((action.payload as Weather).Key);
            return [
                ...state.slice(0, index),
                action.payload as Weather,
                ...state.slice(index + 1)
            ]
        default:
            return state;
    }
}
