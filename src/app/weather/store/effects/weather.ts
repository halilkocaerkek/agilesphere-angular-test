import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import * as weatherActions from '../actions/weather';
import { CityForecast } from '../../../model/city.forecast';
import { WeatherService } from '../../weather.service';

@Injectable()
export class WeatherEffects {

    constructor(private actions$: Actions,
        private weatherService: WeatherService) { }

    @Effect()
    loadForecast$: Observable<Action> = this.actions$.pipe(
        ofType(weatherActions.WeatherActionTypes.SearchForecast),

        switchMap((action: weatherActions.SearchForecast) => {
            return this.weatherService
                .searchWeatherForCity(action.payload.name)
                .pipe(
                    map((forecast: CityForecast) => new weatherActions.SetForecast({ forecast: forecast })),
                    catchError(error => {
                        return of(new weatherActions.SearchForecastFail({ error: error }))}
                    ));
        }
        ));

}
