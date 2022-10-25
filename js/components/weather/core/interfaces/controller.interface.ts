import { IWeatherDetailed } from "./weather-detailed.interface";
import { IView } from "./weather-view.interface";
import { IWeather } from "./weather.interface";
import { IModel } from "./weather.model.interface";

export interface IController {
   model: IModel;
   view: IView;

   onWeatherChangedList(days: IWeather[], current: IWeatherDetailed, location: string): void;
   handleDayClicked(id: number): void;
   handleSelectorClicked(dayRange: number, daysBySearch: string): void;
}