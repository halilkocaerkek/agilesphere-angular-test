import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as WeatherForecastActions from './store/actions/weather'
import { ResultsComponent } from './components/results/results.component';
import { IAppState } from './store/selectors/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.container.html'
})
export class WeatherContainerComponent implements OnInit, AfterViewInit {


  @ViewChild(ResultsComponent) results: ResultsComponent;

  constructor(private store: Store<IAppState> ) {}

  ngOnInit() { }

     ngAfterViewInit(): void { 
      this.store.select('forecasts').subscribe( data => {
        if(data) {
          this.results.items = data.forecasts;
        }
     });
  }

  citySearch(name) {
      this.store.dispatch(new WeatherForecastActions.SearchForecast( {name: name}));
  }
}

