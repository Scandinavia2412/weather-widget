import { IWeatherDetailed } from './weather-detailed.interface';
import { IWeather } from './weather.interface';

export interface IOnWeatherListChanged {
    (days: IWeather[], detailedDay: IWeatherDetailed, location: string): void;
}