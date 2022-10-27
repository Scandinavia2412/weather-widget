import { IWeatherDetailed } from './core/interfaces/weather-detailed.interface';
import { IWeather } from './core/interfaces/weather.interface';

export class Controller {
    model;
    view;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;


        this.model.bindWeatherListChanged(this.onWeatherChangedList);

        this.onWeatherChangedList(this.model.daysList, this.model.current, this.model.location);

        this.view.bindEditDetailedDay(this.handleDayClicked);
        this.view.bindSelectorClicked(this.handleSelectorClicked);
    }

    onWeatherChangedList = (days: IWeather[], current: IWeatherDetailed, location: string) => {
        this.view.displayWeatherDays(days, current, location);
    }

    handleDayClicked = (id: number) => {
        this.model.detailedWeatherChanged(id);
    }

    handleSelectorClicked = (dayRange: number, daysBySearch: string) => {
        this.model.selectorClicked(dayRange, daysBySearch);
    }
}