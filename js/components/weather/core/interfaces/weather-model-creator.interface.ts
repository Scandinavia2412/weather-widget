import { IWeather } from "./weather.interface";
import { IWeatherDetailed } from "./weather-detailed.interface";

export interface IWeatherModelCreator {
    createDayModels(data: any): { daysList: Array <IWeather>, detailedList: Array <IWeatherDetailed>}
}