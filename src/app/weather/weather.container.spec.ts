import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { WeatherContainerComponent } from './weather.container';
import { IAppState } from './store/selectors/weather';
import { Store, StoreModule } from '@ngrx/store';
import { weatherReducer } from './store/reducers/weather';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/effects/weather';
import { of } from 'rxjs/observable/of';

import { WeatherService } from './weather.service';
import * as WeatherForecastActions from './store/actions/weather'
import { ResultsComponent } from './components/results/results.component';

describe('WeatherContainer', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;
  let store: Store<IAppState>;

  const testCityForecast =  {name: 'London', temp12Am: '1', temp6Am: '2', temp12Pm: '3', temp6Pm: '4'};

  let WeatherServiceSpy: jasmine.SpyObj<WeatherService>;
  WeatherServiceSpy = jasmine.createSpyObj('WeatherService', ['searchWeatherForCity']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainerComponent, ResultsComponent],
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('weather', weatherReducer),
        EffectsModule.forFeature([WeatherEffects])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: WeatherService, useValue: WeatherServiceSpy },
      ] 
    })
      .compileComponents();
  }));

  beforeEach(() => {

    WeatherServiceSpy.searchWeatherForCity.and.returnValue(of(testCityForecast));
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  // PLEASE IMPLEMENT MORE TESTS

 
});
