export interface IWeatherDetailed {
    readonly _id: number;
    readonly _dayName: string;
    readonly _temperature: number;
    readonly _description: string;
    readonly _icon: string;
    readonly _date: string;
    readonly _humidity: number;
    readonly _visibility: number;
    readonly _temperatureF: number;
    readonly _wind: number;
    readonly _sunrise: number;
    readonly _sunset: number;


    get id(): number;
    get dayName(): string;
    get temperature(): number;
    get icon(): string;
    get description(): string;
    get date(): string;
    get visibility(): number;
    get temperatureF(): number;
    get humidity(): number;
    get wind(): number;
    get sunrise(): number;
    get sunset(): number;
}