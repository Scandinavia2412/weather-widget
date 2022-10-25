export interface IWeatherService {
    getData(): Awaited <Promise<any>>
}