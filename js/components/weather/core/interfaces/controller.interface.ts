import { IWeatherDetailed } from "./weather-detailed.interface";
import { IWeather } from "./weather.interface";

export interface IController {
   model: any ;
   view: any;

   onWeatherChangedList(days: IWeather[], current: IWeatherDetailed, location: string): void;
   handleDayClicked(id: number): void;
   handleSelectorClicked(dayRange: number, daysBySearch: string): void;
}