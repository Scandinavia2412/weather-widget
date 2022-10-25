import { IWeatherDetailed } from "../core/interfaces/weather-detailed.interface";
import { Weather } from "./weather";

export class WeatherDetailed extends Weather implements IWeatherDetailed {
    readonly _date: string;
    readonly _humidity: number;
    readonly _visibility: number;
    readonly _temperatureF: number;
    readonly _wind: number;
    readonly _sunrise: number;
    readonly _sunset: number;
    
    constructor(id: number, dayName: string, temperature: number, description: string, icon: string, date: string, humidity: number, temperatureF: number, visibility: number, wind: number, sunrise: number, sunset: number) {
        super(id, dayName, temperature, description, icon);
        this._date = date;
        this._humidity = humidity;
        this._visibility = visibility;
        this._temperatureF = temperatureF;
        this._wind = wind;
        this._sunrise = sunrise;
        this._sunset = sunset;
    }

    get date() {
        return this._date;
    };
    get visibility() {
        return this._visibility;
    };
    get temperatureF() {
        return this._temperatureF;
    };
    get humidity() {
        return this._humidity;
    };
    get wind() {
        return this._wind;
    };
    get sunrise() {
        return this._sunrise;
    };
    get sunset() {
        return this._sunset;
    };
}