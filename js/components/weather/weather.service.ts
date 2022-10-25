import { IWeatherService } from './core/interfaces/weather-service.interface';

export default class WeatherService implements IWeatherService{

    async getData() {
        return fetch("https://api.weatherapi.com/v1/forecast.json?key=0b0abb10060749e699c41724221710&q=London&days=7&aqi=no&alerts=no")
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(`Error: ${err}`))
    }
}
