import { IWeather } from './../core/interfaces/weather.interface';

export class Weather implements IWeather {
   readonly _id: number;
   readonly _dayName: string;
   readonly _temperature: number;
   readonly _description: string;
   readonly _icon: string;

    constructor(id: number, dayName: string, temperature: number, description: string, icon: string) {
        this._id = id;
        this._dayName = dayName;
        this._temperature = temperature;
        this._description = description;
        this._icon = icon;
    }

    get id() {
        return this._id;
    };
    get dayName() {
        return this._dayName;
    };
    get temperature() {
        return this._temperature;
    };
    get icon() {
        return this._icon;
    };
    get description() {
        return this._description;
    };
}