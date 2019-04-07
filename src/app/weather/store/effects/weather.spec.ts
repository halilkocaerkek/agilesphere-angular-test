import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { WeatherEffects } from './weather';
import * as weatherActions from '../actions/weather';
import { WeatherService } from '../../weather.service';
import { CityForecast } from '../../../model/city.forecast';

// TODO : add search fail test

describe('WeatherEffects', () => {
  let actions: Observable<any>;

  let effects: WeatherEffects;
  let weatherService: jasmine.SpyObj<WeatherService>; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions),
        {
          provide: WeatherService,
          useValue: {
            searchWeatherForCity: jasmine.createSpy()
          }
        }
      ]
    });

    effects = TestBed.get(WeatherEffects);
    weatherService = TestBed.get(WeatherService);
  });

  describe('load forecast', () => {
    it('should return a forecast with weatherActions.SearchForecast', () => {
      const cityforecast: CityForecast = { name: 'London', temp12Am: '', temp12Pm: '', temp6Am: '', temp6Pm: '' };
      const action = new weatherActions.SearchForecast({ name: 'London' });

      const outcome = new weatherActions.SetForecast({ forecast: cityforecast });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: cityforecast });
      weatherService.searchWeatherForCity.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.loadForecast$).toBeObservable(expected);
    });

  });
}) ;
