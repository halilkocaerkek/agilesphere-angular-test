import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Weather } from '../model/weather';
import { CityForecast } from '../model/city.forecast';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {

    q: '',
    cnt: '24',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'

  };

  constructor(private httpClient: HttpClient) { }

  public searchWeatherForCity(city): Observable<CityForecast> {

    this.params.q = city;

    return this.httpClient.get<Weather>(this.url, { params: this.params })
      .pipe(map(
        result => new CityForecast(result),
        error =>  Observable.throw(error)
      ));
  }

}
