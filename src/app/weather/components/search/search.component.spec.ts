import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {By} from '@angular/platform-browser';
import { SearchComponent } from './search.component';

import Spy = jasmine.Spy;
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../weather.service';
import { of } from 'rxjs/observable/of';
import { CityForecast } from '../../../model/city.forecast';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';

import { weatherReducer } from '../../store/reducers/weather';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let userService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('forecasts', weatherReducer)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        WeatherService,
        Store
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(WeatherService);
    spyOn(userService, 'searchWeatherForCity').and.returnValue(of(CityForecast));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // IMPLEMENT TESTS HERE
  it('should call the submit() method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'submit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.submit).toHaveBeenCalledTimes(1);
  }));

  it('should emit with city name', () => {
    spyOn(component.searchCity, 'emit');

    component.cityName = 'London';

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();
    expect(component.searchCity.emit).toHaveBeenCalledWith('London');
 });

});
