import { IWeatherService } from './components/weather/core/interfaces/weather-service.interface';
import WeatherControllerCreator from './components/weather/weather.controller.creator';
import WeatherService from './components/weather/weather.service';


export let rangeDays: string[] = ['2 days', '4 days', '6 days', '7 days'];
export let searchByDayName: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export let dayNames: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let weatherService: IWeatherService = new WeatherService();
weatherService.getData()
.then((days: any) => {
   if (days) {
      new WeatherControllerCreator().setData(days, dayNames);
   } else {
         console.log('Server not working!!!')
      }
   });
