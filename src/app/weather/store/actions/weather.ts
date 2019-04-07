import { Action } from '@ngrx/store';
import { CityForecast } from '../../../model/city.forecast';
 

export enum WeatherActionTypes {
  SearchForecast = '[Weather] Search Forecast',
  SetForecast = '[Weather] Set Forecast',
  SearchForecastFail = '[Weather] Search Forecast Fail'
}

export interface SearchForecastPayload {
  name: string;
}

export class SearchForecast implements Action {
  readonly type = WeatherActionTypes.SearchForecast;

  constructor(public payload: SearchForecastPayload) {}
}

export interface SetForecastPayload {
  forecast: CityForecast;
}

export class SetForecast implements Action {
  readonly type = WeatherActionTypes.SetForecast;

  constructor(public payload: SetForecastPayload) {}
}

export interface SearchForecastFailPayload {
  error: any;
}

export class SearchForecastFail implements Action {
  readonly type = WeatherActionTypes.SearchForecastFail;

  constructor(public payload: SearchForecastFailPayload) {}
}

export type WeatherActions = SearchForecast | SetForecast | SearchForecastFail;
