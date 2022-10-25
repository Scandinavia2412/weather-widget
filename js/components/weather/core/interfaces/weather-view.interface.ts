import { ElemetsListType } from '../types';
import { IWeatherDetailed } from './weather-detailed.interface';
import { IWeather } from './weather.interface';
export interface IView {
   
    app: HTMLElement;
    themeWrapper: HTMLElement;
    themeToggler: HTMLElement;
    dayRange: HTMLElement;
    daySearch: HTMLElement;
    selectorsRow: HTMLElement;
    detailedWeather: HTMLElement;
    cityName: HTMLElement;
    date: HTMLElement;
    rowContainer: HTMLElement;
    leftSide: HTMLElement;
    temperature: HTMLElement;
    icon: HTMLImageElement;
    description: HTMLElement;
    mainContent: HTMLElement;
    elementsList:ElemetsListType;
    daysRow: HTMLElement;
    rightSide: HTMLElement;
    selectedDaysCount: number;
    dayRangeValue: number;
    searchByDayNameValue: string;
    daysCardList: IWeather[];
    onWeatherDetailedChanged: (id: number | string) => void;

    displayWeatherDays(days: IWeather[], current: IWeatherDetailed, location: string): void;
    createElement(tag: string, className?: string, additionClassName?: string, id?: string): HTMLElement | HTMLImageElement;
    setContext(contentList: any[], type: string): void;
    getElement(selector: string): HTMLElement;
    reverseDate(date: string): string;
    addSelectorOptions(contentList: any): HTMLElement;
    createDataList(data: any[] | IWeatherDetailed, typeOfList: string): void;
    bindEditDetailedDay(handler: (id: number | string) => void): void;
    bindSelectorClicked(handler: (arg0: any, arg1: any) => void): void;
    handlerWeatherDetailed(): void;
    appendElements(type: string, selectedDaysCount?: number): HTMLElement;
    handlerThemeToggler(): void;
    onSelectorClick(): void;
    createElementsList(): { detailedCardElements: any, daysCardList: any};
    setActiveMode(current: IWeatherDetailed, elementsList: any): void;
}