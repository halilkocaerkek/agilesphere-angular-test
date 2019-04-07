import { CityForecast } from '../../../model/city.forecast';
import { WeatherActions, SetForecast, WeatherActionTypes } from '../actions/weather';


export interface IWeatherState {
    forecasts?: CityForecast[];
}

export const initialWeatherState: IWeatherState = {
    forecasts: []
};

export function weatherReducer(state = initialWeatherState, action: WeatherActions): IWeatherState {
    let result;
    switch (action.type) {
        case WeatherActionTypes.SetForecast:
            result = handleSetForecast(state, action);
            break;
        default:
            result = state;
            break;
    }

    return result;
}

function handleSetForecast(state: IWeatherState, action: SetForecast): IWeatherState {
    // remove existing city
    state.forecasts = state.forecasts.filter(o => o.name !== action.payload.forecast.name);
    const result = { forecasts: [...state.forecasts, action.payload.forecast] };
    return result;
}

