import { IWeatherDetailed } from './core/interfaces/weather-detailed.interface';
import { IWeather } from './core/interfaces/weather.interface';
import { IWeatherModelCreator } from "./core/interfaces/weather-model-creator.interface";
import { Weather } from './models/weather';
import { WeatherDetailed } from './models/weather-detailed';

export default class WeatherModelCreator implements IWeatherModelCreator{

    createDayModels(data: any) {
        let daysList: IWeather[] = [];
        let detailedDaysList: IWeatherDetailed[] = [];
        let icon = '';
        const result = data.map((day: any, index: number) => {
            let {
                date,
                dayName,
                day: {
                    condition: {
                        text
                    },
                    avghumidity,
                    avgtemp_c,
                    avgtemp_f,
                    avgvis_km,
                    maxwind_kph
                },
                astro: {
                    sunrise,
                    sunset
                }
            } = day;

            if (text === 'Partly cloudy') {
            } else if (text === 'Sunny') {
                icon = 'images/icons/2.png'
                icon = 'images/icons/3.png'
            } else {
                icon = 'images/icons/1.png'
            }

            daysList.push(new Weather(index + 1, dayName, avgtemp_c, text, icon));
            detailedDaysList.push(new WeatherDetailed(index + 1, dayName, avgtemp_c, text, icon, date, avghumidity, avgtemp_f, avgvis_km, maxwind_kph, sunrise, sunset))
            return {
                daysList,
                detailedDaysList
            }
        })
        return result;
    }
}