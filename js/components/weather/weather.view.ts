import { rangeDays, searchByDayName } from '../../index';
import { IWeatherDetailed } from './core/interfaces/weather-detailed.interface';
import { IWeather } from "./core/interfaces/weather.interface";
import { ElementsList } from './core/types';

export class View {
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
    elementsList: ElementsList;
    daysRow: HTMLElement;
    rightSide: HTMLElement;
    selectedDaysCount: number;
    daysCardList: IWeather[];
    dayRangeValue: number;
    searchByDayNameValue: string;
    [index: string]: any;
    onWeatherDetailedChanged: (id: number | string) => void;

        constructor() {
        this.app = this.getElement('#root');
        this.app.classList.add('main');
        this.themeWrapper = this.createElement('div', 'main__theme-wrapper', 'theme');
        this.themeToggler = this.createElement('div', 'fas', 'fa-moon', 'theme-toggler');
        this.dayRange = this.createElement('div', 'main__selector', 'selector');
        this.dayRange.textContent = 'Days range';
        this.daySearch = this.createElement('div', 'main__selector', 'selector');
        this.daySearch.textContent = 'Search by day';
        this.selectorsRow = this.createElement('div', 'main__selectors-row');
        this.detailedWeather = this.createElement('div', 'main__detailed-day', 'detailed-day');
        this.cityName = this.createElement('h3', 'detailed-day__title');
        this.date = this.createElement('p', 'detailed-day__date');
        this.rowContainer = this.createElement('div', 'detailed-day__row');
        this.leftSide = this.createElement('div', 'detailed-day__left');
        this.temperature = this.createElement('p', 'detailed-day__temperature');
        this.icon = this.createElement('img', 'detailed-day__icon') as HTMLImageElement;
        this.icon.alt = "icon";
        this.description = this.createElement('p', 'detailed-day__description');
        this.mainContent = this.createElement('div', 'detailed-day__main-content');
        this.elementsList = this.createElementsList();

        this.themeWrapper.append(this.themeToggler);
        this.rightSide = this.appendElements('detailCard');
        this.selectorsRow.append(this.dayRange, this.daySearch);
        this.dayRange.append(this.addSelectorOptions(rangeDays));
        this.daySearch.append(this.addSelectorOptions(searchByDayName));
        this.app.append(this.themeWrapper, this.selectorsRow, this.detailedWeather, this.daysRow);
        this.onSelectorClick();
        this.handlerThemeToggler();
    }

    bindEditDetailedDay(handler: (id: number | string) => void) {
        this.onWeatherDetailedChanged = handler;
    }

    
    bindSelectorClicked(handler: (dayRangeValue: number, searchByDayNameValue: string) => void) {
        this.dayRange.addEventListener('click', () => {
            handler(this.dayRangeValue, this.searchByDayNameValue);
        })
        this.daySearch.addEventListener('click', () => {
            handler(this.dayRangeValue, this.searchByDayNameValue);
        })
    }

    handlerThemeToggler() {
        let url;

        let themeToggler = document.querySelector('#theme-toggler')! as HTMLElement;
        window.localStorage.setItem('imageUrl', 'https://wallpapercave.com/wp/wp7041961.jpg')
        document.body.style.backgroundImage = `url(${'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`;
        
        themeToggler.onclick = () => {
            themeToggler.classList.toggle('fa-moon');
            themeToggler.classList.toggle('fa-sun');

            if (themeToggler.classList.contains('fa-sun')) {
                window.localStorage.setItem('imageUrl', 'https://wallpapercave.com/wp/wp7041961.jpg')
                url = localStorage.getItem('imageUrl')
                document.body.classList.add('active');
                document.body.style.backgroundImage = `url(${url})`
            } else {
                window.localStorage.setItem('imageUrl', 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
                url = localStorage.getItem('imageUrl');
                document.body.classList.remove('active');
                document.body.style.backgroundImage = `url(${url})`
            }
        }
    }
    
    onSelectorClick() {
        const selectors = document.querySelectorAll('.selector');
        [...selectors].map(item => {
            item.classList.add('active')
            item.addEventListener('click', (e) => {
                item.classList.toggle('active');
                if ((e.target as HTMLElement).classList.contains('selector__option')) {
                    const optionContent = (e.target as HTMLElement).textContent;
                    if (+optionContent[0]) {
                        this.dayRangeValue = +optionContent[0];
                    }
                    else {
                        this.searchByDayNameValue = optionContent;
                    }
                }
            })
        })
    }

    handlerWeatherDetailed() {
        this.daysRow.addEventListener('click', (e) => {                      
            this.onWeatherDetailedChanged(( <HTMLElement>e.target ).parentElement.id || (e.target as HTMLElement).id);

        })
    }

    createElementsList() {
        let detailedCardElements = []
        let daysCardList = []
        for (let i = 1; i < 7; i++) {
            this[`parametr${i}`] = this.createElement('p', 'detailed-day__card-content')
            this[`parametrDescription${i}`] = this.createElement('p', 'detailed-day__card-content')
            this[`detailedCard${i}`] = this.createElement('div', 'detailed-day__card')
            detailedCardElements.push({ 
                parametr: this[`parametr${i}`],
                 parametrDescription: this[`parametrDescription${i}`],
                  detailedCard: this[`detailedCard${i}`] })
        }
        for (let i = 1; i < 8; i++) {
            this[`nameOfDay${i}`] = this.createElement('div', 'main__day-name')
            this[`iconWrapper${i}`] = this.createElement('img', 'main__day-icon')
            this[`temp${i}`] = this.createElement('div', 'main__day-temperature')
            this[`wrapper${i}`] = this.createElement('div', 'main__day')
            i === 1 ? this[`wrapper${i}`].classList.add('active') : null
            daysCardList.push({ 
                nameOfDay: this[`nameOfDay${i}`],
                 iconWrapper: this[`iconWrapper${i}`], 
                 temp: this[`temp${i}`],
                 wrapper: this[`wrapper${i}`] })
        }
        return { detailedCardElements, daysCardList }
    }

    appendElements(type: string, selectedDaysCount?: number) {
        let { detailedCardElements, daysCardList } = this.elementsList;
        let container: HTMLElement;
        if (type === 'detailCard') {
            container = this.createElement('div', 'detailed-day__right')
            detailedCardElements.map(item => {
                let { parametr, parametrDescription, detailedCard } = item;
                detailedCard.append(parametr, parametrDescription)
                container.append(detailedCard)
            })
            return container;
        } else {
            container = this.createElement('div', 'main__days');
            let selectedDays = daysCardList.slice(0, selectedDaysCount);
            selectedDays.map(item => {
                let { nameOfDay, iconWrapper, temp, wrapper } = item;
                wrapper.append(nameOfDay, iconWrapper, temp)
                container.append(wrapper)
            })
            return container;
        }
    }

    createElement(tag: string, className?:string, additionClassName?: string, id?: string) {
        const element = document.createElement(tag);
        if (id) {
            element.id = id;
        }
        if (className && !additionClassName) {
            element.classList.add(className);
        }
        else if (className && additionClassName) {
            element.classList.add(`${className}`, `${additionClassName}`);
        }
        return element;
    }

    getElement(selector: string): HTMLElement {
        return document.querySelector(selector);
    }

    reverseDate(date: string): string {
        return date.split('-').reverse().join('/');
    }

    addSelectorOptions(contentList: any): HTMLElement{
        let optionsList = this.createElement('div', 'selector__options-list');
        contentList.map((text: any) => {
            let option = this.createElement('div', 'selector__option');
            option.textContent = `${text}`;
            optionsList.append(option);
        })
        return optionsList;
    }

    createDataList(data: any, typeOfList: string) {
        let contentList: any = [] ;
        let degreesCelcius = String.fromCodePoint(8451);
        if (typeOfList === 'detailedCard') {
            let { humidity, temperatureF, temperature, wind, sunset, sunrise } = data
            contentList = [
                { Humidity: `${humidity} %` },
                { ['Temperature F']: ` ${temperatureF} F` },
                { ['Max temp']: `${temperature}${degreesCelcius}` },
                { Wind: `${wind} mpH` },
                { Sunset: sunset },
                { Sunrise: sunrise }
            ]
        } else {
            data.map((item: { id: number; dayName:string; icon: string; temperature: number; }) => {
                let { id, dayName, icon, temperature } = item;
                let data = { id, dayName, icon, temperature };
                contentList.push(data);
            })
        }
        return contentList;
    }

    setContext(contentList: any[], type: string) {
        let degreesCelcius = String.fromCodePoint(8451);
        let { detailedCardElements, daysCardList } = this.elementsList;
        if (type === 'detailCard') {

            for (let i = 0; i < contentList.length; i++) {
                let { parametr, parametrDescription } = detailedCardElements[i];
                parametr.textContent = `${Object.keys(contentList[i])}`;
                parametrDescription.textContent = `${Object.values(contentList[i])}`;
            }
        } else {
            for (let i = 0; i < contentList?.length; i++) {
                let { nameOfDay, iconWrapper, temp, wrapper } = daysCardList[i];
                let { id, dayName, icon, temperature } = contentList[i];
                wrapper.id = id;
                nameOfDay.textContent = dayName;
                iconWrapper.src = `${icon}`;
                iconWrapper.alt = 'icon';
                temp.textContent = `+${temperature} ${degreesCelcius}`;
            }
        }
    }

    setActiveMode(current: IWeatherDetailed, elementsList: any) {
        let activeElement = elementsList.find((item:any) => item.wrapper.classList.contains('active'));
        activeElement?.wrapper?.classList.remove('active');
        let element = elementsList?.find((item: { wrapper: { id: string | number; }; }) => +item.wrapper.id === current.id);
        element?.wrapper?.classList.add('active');
    }

    displayWeatherDays(days: IWeather[], current: IWeatherDetailed, location: string) {   
        this.selectedDaysCount = days.length;
        if (!days.length && !!current) {
            const message = this.createElement('p', 'main__message');
            message.textContent = 'No data available';
            this.app.append(message);
        } else {          
            this.cityName.textContent = `${location}`;
            this.date.textContent = `${current?.dayName}  ${this.reverseDate(current?.date)}`;
            let degreesCelcius = String.fromCodePoint(8451);
            this.temperature.textContent = `+${Math.round(current.temperature)} ${degreesCelcius}`;
            this.icon.src = `${current.icon}`;
            this.description.textContent = `${current.description}`;
            const detailCardContentList = this.createDataList(current, 'detailedCard');         
            this.setContext(detailCardContentList, 'detailCard');
            const daysContentList = this.createDataList(days, 'dayCard');
            this.setContext(daysContentList, 'dayCard');
            this.mainContent.append(this.temperature, this.description);
            this.leftSide.append(this.icon, this.mainContent);
            this.rowContainer.append(this.leftSide, this.rightSide);
            this.setActiveMode(current, this.elementsList.daysCardList);
            this.detailedWeather.append(this.cityName, this.date, this.rowContainer);
            this.daysRow = this.appendElements('dayCard', days.length);
            this.handlerWeatherDetailed();
            let app = document.querySelector('#root');
            app.removeChild(app.lastChild);
            this.app.append(this.daysRow);
        }
    }
}