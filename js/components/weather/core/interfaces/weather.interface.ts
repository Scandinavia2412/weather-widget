export interface IWeather {
    readonly _id: number;
    readonly _dayName: string;
    readonly _temperature: number;
    readonly _description: string;
    readonly _icon: string;

    get id(): number;
    get dayName(): string;
    get temperature(): number;
    get icon(): string;
    get description(): string;
}