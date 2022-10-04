let rangeDays = ['1-3O Octember', '4-5 October'];
let searchByDayName = ['today', 'hourly', 'daily'];

class Model {
    constructor(daysList, detailedDaysList, location) {
        this.daysList = daysList
        this.detailedDaysList = detailedDaysList
        this.current = detailedDaysList[0]
        this.location = location
    }

    bindWeatherListChanged(callback) {
        this.onWeatherListChanged = callback;
    }

    detailedWeatherChanged(id) {
        const choosedWeather = this.detailedDaysList.find(item => item.id === +id)
        this.current = choosedWeather;
        this.commit(this.daysList, this.current, this.location)
    }

    commit(days, detailedDay, location) {
        this.onWeatherListChanged(days, detailedDay, location)
    }
}

class View {
    constructor() {
        this.app = this.getElement('#root')
        this.app.classList.add('main')
        this.dayRange = this.createElement('div', 'main__selector', 'selector')
        this.dayRange.textContent = 'Days range'
        this.daySearch = this.createElement('div', 'main__selector', 'selector')
        this.daySearch.textContent = 'Search by day'
        this.selectorsRow = this.createElement('div', 'main__selectors-row')
        this.detailedWeather = this.createElement('div', 'main__detailed-day', 'detailed-day')
        this.cityName = this.createElement('h3', 'detailed-day__title')
        this.date = this.createElement('p', 'detailed-day__date')
        this.rowContainer = this.createElement('div', 'detailed-day__row')
        this.leftSide = this.createElement('div', 'detailed-day__left')
        this.temperature = this.createElement('p', 'detailed-day__temperature')
        this.icon = this.createElement('img', 'detailed-day__icon')
        this.icon.alt = "icon"
        this.description = this.createElement('p', 'detailed-day__description')
        this.mainContent = this.createElement('div', 'detailed-day__main-content')
        this.elementsList = this.createElementsList()

        this.rightSide = this.appendElements('detailCard')
        this.daysRow = this.appendElements('dayCard')
        this.app.append(this.selectorsRow)
        this.selectorsRow.append(this.dayRange, this.daySearch)
        this.dayRange.append(this.addSelectorOptions(rangeDays))
        this.daySearch.append(this.addSelectorOptions(searchByDayName))
        this.app.append(this.detailedWeather, this.rightSide, this.daysRow)
    }

    bindEditDetailedDay(handler) {
        this.daysRow.addEventListener('click', (e) => {
            handler(e.target.parentNode.id || e.target.id);

        })
    }

    createElementsList() {
        let detailedCardElements = []
        let daysCardList = []
        for (let i = 1; i < 7; i++) {
            this[`parametr${i}`] = this.createElement('p', 'detailed-day__card-content')
            this[`parametrDescription${i}`] = this.createElement('p', 'detailed-day__card-content')
            this[`detailedCard${i}`] = this.createElement('div', 'detailed-day__card')
            detailedCardElements.push({ parametr: this[`parametr${i}`], parametrDescription: this[`parametrDescription${i}`], detailedCard: this[`detailedCard${i}`] })
        }
        for (let i = 1; i < 8; i++) {
            this[`nameOfDay${i}`] = this.createElement('div', 'main__day-name')
            this[`iconWrapper${i}`] = this.createElement('img', 'main__day-icon')
            this[`temp${i}`] = this.createElement('div', 'main__day-temperature')
            this[`wrapper${i}`] = this.createElement('div', 'main__day')
            i === 1 ? this[`wrapper${i}`].classList.add('active') : null
            daysCardList.push({ nameOfDay: this[`nameOfDay${i}`], iconWrapper: this[`iconWrapper${i}`], temp: this[`temp${i}`], wrapper: this[`wrapper${i}`] })
        }
        return { detailedCardElements, daysCardList }
    }

    appendElements(type) {
        let { detailedCardElements, daysCardList } = this.elementsList;
        let container;
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
            daysCardList.map(item => {
                let { nameOfDay, iconWrapper, temp, wrapper } = item;
                wrapper.append(nameOfDay, iconWrapper, temp)
                container.append(wrapper)
            })
            return container;
        }
    }

    createElement(tag, className, additionClassName) {
        const element = document.createElement(tag);
        if (className && !additionClassName) {
            element.classList.add(className)
        }
        else if (className && additionClassName) {
            element.classList.add(`${className}`, `${additionClassName}`)
        }
        return element
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    reverseDate(date) {
        return date.split('-').reverse().join('/')
        return date;
    }

    addSelectorOptions(contentList) {
        let optionsList = this.createElement('div', 'selector__options-list');
        contentList.map(text => {
            let option = this.createElement('div', 'selector__option');
            option.textContent = `${text}`;
            optionsList.append(option);
        })
        return optionsList;
    }


    createDataList(data, typeOfList) {
        let contentList = [];
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
            data.map(item => {
                let { id, dayName, icon, temperature } = item;
                let data = { id, dayName, icon, temperature };
                contentList.push(data)
            })
        }
        return contentList;
    }

    setContext(contentList, type) {
        let degreesCelcius = String.fromCodePoint(8451);
        let { detailedCardElements, daysCardList } = this.elementsList;
        if (type === 'detailCard') {
            for (let i = 0; i < contentList.length; i++) {
                let { parametr, parametrDescription } = detailedCardElements[i];
                parametr.textContent = Object.keys(contentList[i])
                parametrDescription.textContent = Object.values(contentList[i])
            }
        } else {
            for (let i = 0; i < daysCardList.length; i++) {
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
    setActiveMode(current, elementsList) {
        let activeElement = elementsList.find(item => item.wrapper.classList.contains('active'));
        activeElement.wrapper.classList.remove('active');
        let element = elementsList.find(item => +item.wrapper.id === current.id);
        element.wrapper.classList.add('active')
    }
    displayWeatherDays(days, current, location) {
        if (!days.length && !!current) {
            const message = this.createElement('p', 'main__message');
            message.textContent = 'No data available';
            this.app.append(message)
        } else {
            this.cityName.textContent = `${location}`
            this.date.textContent = `${current.dayName}  ${this.reverseDate(current.date)}`
            let degreesCelcius = String.fromCodePoint(8451);
            this.temperature.textContent = `+${Math.round(current.temperature)} ${degreesCelcius}`
            this.icon.src = `${current.icon}`
            this.description.textContent = `${current.description}`
            const detailCardContentList = this.createDataList(current, 'detailedCard')
            this.setContext(detailCardContentList, 'detailCard')
            const daysContentList = this.createDataList(days, 'dayCard')
            this.setContext(daysContentList, 'dayCard')
            this.mainContent.append(this.temperature, this.description)
            this.leftSide.append(this.icon, this.mainContent)
            this.rowContainer.append(this.leftSide, this.rightSide)
            this.setActiveMode(current, this.elementsList.daysCardList)
            this.detailedWeather.append(this.cityName, this.date, this.rowContainer)
            this.app.append(this.daysRow)
        }
    }
}
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        //Explicit this binding 
        this.model.bindWeatherListChanged(this.onWeatherChangedList)

        //Display initial weather info
        this.onWeatherChangedList(this.model.daysList, this.model.current, this.model.location)

        this.view.bindEditDetailedDay(this.handleDayClicked)
    }

    onWeatherChangedList = (days, current, location) => {
        this.view.displayWeatherDays(days, current, location);
    }

    handleDayClicked = id => {
        this.model.detailedWeatherChanged(id)
    }
}
class Weather {
    constructor(id, dayName, temperature, description, icon) {
        this.id = id
        this._dayName = dayName
        this._temperature = temperature
        this._description = description
        this._icon = icon
    }

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
class WeatherDetailed extends Weather {
    constructor(id, dayName, temperature, description, icon, date, humidity, temperatureF, visibility, wind, sunrise, sunset) {
        super(id, dayName, temperature, description, icon);
        this._date = date;
        this._humidity = humidity;
        this._visibility - visibility;
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

function getData() {
    return fetch("https://api.weatherapi.com/v1/forecast.json?key=333b71fbcd1b4dc891853646220210&q=London&days=7&aqi=no&alerts=no")
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(`Error: ${err}`))
}

function createWeatherDays(allDays) {
    let daysList = [];
    let detailedDaysList = [];
    let icon = '';
    const result = allDays.map((day, index) => {
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
            icon = 'images/icons/1.png'
        } else if (text === 'Sunny') {
            icon = 'images/icons/3.png'
        } else {
            icon = 'images/icons/2.png'
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

function setData() {
    let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let daysList, detailedDaysList;
    getData()
        .then(data => {
            let {
                location,
                forecast: {
                    forecastday
                }
            } = data;
            for (let i = 0; i < forecastday.length; i++) {
                forecastday[i].dayName = dayNames[i];
                ({
                    daysList,
                    detailedDaysList
                } = createWeatherDays(forecastday)[length]);
            }
            new Controller(new Model(daysList, detailedDaysList, location.name), new View());
        })
}

setData();