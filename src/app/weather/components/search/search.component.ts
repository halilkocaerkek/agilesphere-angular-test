import { Component, Output, EventEmitter } from '@angular/core';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Output() searchCity = new EventEmitter();
  public cityName: string;

  submit() {
    this.searchCity.emit(this.cityName);
  }
}
