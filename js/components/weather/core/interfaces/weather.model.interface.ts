import { IOnWeatherListChanged } from './on-weather-list-changed.interface';
import { IWeatherDetailed } from './weather-detailed.interface';
import { IWeather } from './weather.interface';

export interface IModel {
    daysList: IWeather[];
    detailedDaysList: IWeatherDetailed[];
    current: IWeatherDetailed;
    location: string;
    daysByRange: IWeather[];
    daysBySearch: IWeatherDetailed;

    onWeatherListChanged: IOnWeatherListChanged;
    bindWeatherListChanged(callback:IOnWeatherListChanged):void;
    detailedWeatherChanged(id: number): void;
    commitOnWeatherListChanged(days: IWeather[], detailedDay: IWeatherDetailed, location: string): void;
    selectorClicked(dayRange: number, daysBySearch: string): void;
}