import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IWeatherState } from '../reducers/weather';


export interface IAppState {
  forecasts: IWeatherState;
}

export const selectFeature = createFeatureSelector<IWeatherState>('forecasts');

export const getWeatherState = createSelector(
  selectFeature,
  (state: IWeatherState) => state.forecasts
);
