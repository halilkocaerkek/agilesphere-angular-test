import { Weather } from "./weather";

export class CityForecast {
    public name: string;

    // I have added this parameters to fill the template.
    public temp6Am: string;
    public temp12Am: string;
    public temp6Pm: string;
    public temp12Pm: string;

    // We can store next 24 hours data and display every next 3 hours
    // public temps: string[] = [];

    constructor(weatherData: Weather) {
        this.name = weatherData.city.name;
        this.temp6Am = CityForecast.getTempbyTime(weatherData, '06:00:00');
        this.temp12Am = CityForecast.getTempbyTime(weatherData, '12:00:00');
        this.temp6Pm = CityForecast.getTempbyTime(weatherData, '18:00:00');
        this.temp12Pm = CityForecast.getTempbyTime(weatherData, '00:00:00');
    }

    private static getTempbyTime(data: Weather, time: string): any {
        const result = data.list.find(x => x.dt_txt.indexOf(time) > -1);
        if (result) {
            return result.main.temp_max;
        }

        return '***';
    }

}