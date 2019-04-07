import { Component, Input  } from '@angular/core';

import { CityForecast } from '../../../model/city.forecast';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})

export class ResultsComponent {

  @Input()  items: CityForecast[] =[];

}
