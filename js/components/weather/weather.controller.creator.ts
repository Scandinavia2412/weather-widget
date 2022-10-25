import { IWeatherControllerCreator } from './core/interfaces/weather-controller-creator.interface';
import { Controller } from './weather.controller';
import Model from './weather.model';
import WeatherModelCreator from './weather.model.creator';
import { View } from './weather.view';

export default class WeatherControllerCreator implements IWeatherControllerCreator {

    setData(days: any, dayNames: string[]) {
        let daysList, detailedDaysList;
        let {
            location,
            forecast: {
                forecastday
            }
        } = days;
        for (let i = 0; i < forecastday.length; i++) {
            forecastday[i].dayName = dayNames[i];
            ({
                daysList,
                detailedDaysList
            } = new WeatherModelCreator().createDayModels(forecastday)[length]);
        }
        new Controller(new Model(daysList, detailedDaysList, location.name), new View());
    }
}