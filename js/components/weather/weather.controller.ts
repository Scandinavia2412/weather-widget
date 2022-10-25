import { IWeatherDetailed } from './core/interfaces/weather-detailed.interface';
import { IWeather } from './core/interfaces/weather.interface';
import { IView } from './core/interfaces/weather-view.interface';
import { IController } from "./core/interfaces/controller.interface";
import { IModel } from "./core/interfaces/weather.model.interface";

export class Controller implements IController {
    model: IModel;
    view: IView;
    constructor(model: IModel, view: IView) {
        this.model = model;
        this.view = view;


        this.model.bindWeatherListChanged(this.onWeatherChangedList);

        this.onWeatherChangedList(this.model.daysList, this.model.current, this.model.location);

        this.view.bindEditDetailedDay(this.handleDayClicked);
        this.view.bindSelectorClicked(this.handleSelectorClicked);
    }

    onWeatherChangedList = (days: IWeather[], current: IWeatherDetailed, location: string) => {
        console.log(this.model, this.view)
        this.view.displayWeatherDays(days, current, location);
    }

    handleDayClicked = (id: number) => {
        this.model.detailedWeatherChanged(id);
    }

    handleSelectorClicked = (dayRange: number, daysBySearch: string) => {
        this.model.selectorClicked(dayRange, daysBySearch);
    }
}