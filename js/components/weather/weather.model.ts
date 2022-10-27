import { IDayChangeHandler } from './core/interfaces/on-weather-list-changed.interface';
import { IWeatherDetailed } from './core/interfaces/weather-detailed.interface';
import { IWeather } from './core/interfaces/weather.interface';

export default class Model {

    daysList: IWeather[];
    detailedDaysList: IWeatherDetailed[];
    current: IWeatherDetailed;
    location: string;
    daysByRange: IWeather[];
    daysBySearch: IWeatherDetailed;

    onWeatherListChanged:  IDayChangeHandler;

    constructor(daysList: IWeather[], detailedDaysList: IWeatherDetailed[], location: string) {
        this.daysList = daysList;
        this.detailedDaysList = detailedDaysList;
        this.current = detailedDaysList[0];
        this.location = location;
     
    }

    bindWeatherListChanged(callback: IDayChangeHandler){
        this.onWeatherListChanged = callback;
    }

    detailedWeatherChanged(id: number) {
        const choosedWeather = this.detailedDaysList.find(item => item.id === +id);
        this.current = choosedWeather;
        if (this.daysByRange) {
            this.commitOnWeatherListChanged(this.daysByRange, this.daysBySearch, this.location);
            this.commitOnWeatherListChanged(this.daysByRange, this.current, this.location);
        } else {
            this.commitOnWeatherListChanged(this.daysList, this.current, this.location);
        }
    }

    commitOnWeatherListChanged(days: IWeather[], detailedDay: IWeatherDetailed, location: string) {
        this.onWeatherListChanged(days, detailedDay, location);
    }

    selectorClicked(dayRange: number = 7, daysBySearch: string = this.current.dayName) {
        this.daysByRange = this.daysList.slice(0, dayRange);
        this.daysBySearch = this.detailedDaysList.find(day => day.dayName === daysBySearch);
        this.commitOnWeatherListChanged(this.daysByRange, this.daysBySearch, this.location);
    }
}