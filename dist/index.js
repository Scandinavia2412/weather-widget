System.register("components/weather/core/interfaces/weather-service.interface", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/weather/core/interfaces/weather-controller-creator.interface", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/weather/core/interfaces/weather-detailed.interface", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/weather/core/interfaces/weather.interface", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/weather/weather.controller", [], function (exports_5, context_5) {
    "use strict";
    var Controller;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Controller = class Controller {
                constructor(model, view) {
                    this.onWeatherChangedList = (days, current, location) => {
                        this.view.displayWeatherDays(days, current, location);
                    };
                    this.handleDayClicked = (id) => {
                        this.model.detailedWeatherChanged(id);
                    };
                    this.handleSelectorClicked = (dayRange, daysBySearch) => {
                        this.model.selectorClicked(dayRange, daysBySearch);
                    };
                    this.model = model;
                    this.view = view;
                    this.model.bindWeatherListChanged(this.onWeatherChangedList);
                    this.onWeatherChangedList(this.model.daysList, this.model.current, this.model.location);
                    this.view.bindEditDetailedDay(this.handleDayClicked);
                    this.view.bindSelectorClicked(this.handleSelectorClicked);
                }
            };
            exports_5("Controller", Controller);
        }
    };
});
System.register("components/weather/core/interfaces/on-weather-list-changed.interface", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/weather/weather.model", [], function (exports_7, context_7) {
    "use strict";
    var Model;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor(daysList, detailedDaysList, location) {
                    this.daysList = daysList;
                    this.detailedDaysList = detailedDaysList;
                    this.current = detailedDaysList[0];
                    this.location = location;
                }
                bindWeatherListChanged(callback) {
                    this.onWeatherListChanged = callback;
                }
                detailedWeatherChanged(id) {
                    const choosedWeather = this.detailedDaysList.find(item => item.id === +id);
                    this.current = choosedWeather;
                    if (this.daysByRange) {
                        this.commitOnWeatherListChanged(this.daysByRange, this.daysBySearch, this.location);
                        this.commitOnWeatherListChanged(this.daysByRange, this.current, this.location);
                    }
                    else {
                        this.commitOnWeatherListChanged(this.daysList, this.current, this.location);
                    }
                }
                commitOnWeatherListChanged(days, detailedDay, location) {
                    this.onWeatherListChanged(days, detailedDay, location);
                }
                selectorClicked(dayRange = 7, daysBySearch = this.current.dayName) {
                    this.daysByRange = this.daysList.slice(0, dayRange);
                    this.daysBySearch = this.detailedDaysList.find(day => day.dayName === daysBySearch);
                    this.commitOnWeatherListChanged(this.daysByRange, this.daysBySearch, this.location);
                }
            };
            exports_7("default", Model);
        }
    };
});
System.register("components/weather/models/weather", [], function (exports_8, context_8) {
    "use strict";
    var Weather;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            Weather = class Weather {
                constructor(id, dayName, temperature, description, icon) {
                    this._id = id;
                    this._dayName = dayName;
                    this._temperature = temperature;
                    this._description = description;
                    this._icon = icon;
                }
                get id() {
                    return this._id;
                }
                ;
                get dayName() {
                    return this._dayName;
                }
                ;
                get temperature() {
                    return this._temperature;
                }
                ;
                get icon() {
                    return this._icon;
                }
                ;
                get description() {
                    return this._description;
                }
                ;
            };
            exports_8("Weather", Weather);
        }
    };
});
System.register("components/weather/models/weather-detailed", ["components/weather/models/weather"], function (exports_9, context_9) {
    "use strict";
    var weather_1, WeatherDetailed;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (weather_1_1) {
                weather_1 = weather_1_1;
            }
        ],
        execute: function () {
            WeatherDetailed = class WeatherDetailed extends weather_1.Weather {
                constructor(id, dayName, temperature, description, icon, date, humidity, temperatureF, visibility, wind, sunrise, sunset) {
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
                }
                ;
                get visibility() {
                    return this._visibility;
                }
                ;
                get temperatureF() {
                    return this._temperatureF;
                }
                ;
                get humidity() {
                    return this._humidity;
                }
                ;
                get wind() {
                    return this._wind;
                }
                ;
                get sunrise() {
                    return this._sunrise;
                }
                ;
                get sunset() {
                    return this._sunset;
                }
                ;
            };
            exports_9("WeatherDetailed", WeatherDetailed);
        }
    };
});
System.register("components/weather/weather.model.creator", ["components/weather/models/weather", "components/weather/models/weather-detailed"], function (exports_10, context_10) {
    "use strict";
    var weather_2, weather_detailed_1, WeatherModelCreator;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (weather_2_1) {
                weather_2 = weather_2_1;
            },
            function (weather_detailed_1_1) {
                weather_detailed_1 = weather_detailed_1_1;
            }
        ],
        execute: function () {
            WeatherModelCreator = class WeatherModelCreator {
                createDayModels(data) {
                    let daysList = [];
                    let detailedDaysList = [];
                    let icon = '';
                    const result = data.map((day, index) => {
                        let { date, dayName, day: { condition: { text }, avghumidity, avgtemp_c, avgtemp_f, avgvis_km, maxwind_kph }, astro: { sunrise, sunset } } = day;
                        if (text === 'Partly cloudy') {
                        }
                        else if (text === 'Sunny') {
                            icon = 'images/icons/2.png';
                            icon = 'images/icons/3.png';
                        }
                        else {
                            icon = 'images/icons/1.png';
                        }
                        daysList.push(new weather_2.Weather(index + 1, dayName, avgtemp_c, text, icon));
                        detailedDaysList.push(new weather_detailed_1.WeatherDetailed(index + 1, dayName, avgtemp_c, text, icon, date, avghumidity, avgtemp_f, avgvis_km, maxwind_kph, sunrise, sunset));
                        return {
                            daysList,
                            detailedDaysList
                        };
                    });
                    return result;
                }
            };
            exports_10("default", WeatherModelCreator);
        }
    };
});
System.register("components/weather/core/types", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/weather/weather.view", ["index"], function (exports_12, context_12) {
    "use strict";
    var index_1, View;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            View = class View {
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
                    this.icon = this.createElement('img', 'detailed-day__icon');
                    this.icon.alt = "icon";
                    this.description = this.createElement('p', 'detailed-day__description');
                    this.mainContent = this.createElement('div', 'detailed-day__main-content');
                    this.elementsList = this.createElementsList();
                    this.themeWrapper.append(this.themeToggler);
                    this.rightSide = this.appendElements('detailCard');
                    this.selectorsRow.append(this.dayRange, this.daySearch);
                    this.dayRange.append(this.addSelectorOptions(index_1.rangeDays));
                    this.daySearch.append(this.addSelectorOptions(index_1.searchByDayName));
                    this.app.append(this.themeWrapper, this.selectorsRow, this.detailedWeather, this.daysRow);
                    this.onSelectorClick();
                    this.handlerThemeToggler();
                }
                bindEditDetailedDay(handler) {
                    this.onWeatherDetailedChanged = handler;
                }
                bindSelectorClicked(handler) {
                    this.dayRange.addEventListener('click', () => {
                        handler(this.dayRangeValue, this.searchByDayNameValue);
                    });
                    this.daySearch.addEventListener('click', () => {
                        handler(this.dayRangeValue, this.searchByDayNameValue);
                    });
                }
                handlerThemeToggler() {
                    let url;
                    let themeToggler = document.querySelector('#theme-toggler');
                    window.localStorage.setItem('imageUrl', 'https://wallpapercave.com/wp/wp7041961.jpg');
                    document.body.style.backgroundImage = `url(${'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`;
                    themeToggler.onclick = () => {
                        themeToggler.classList.toggle('fa-moon');
                        themeToggler.classList.toggle('fa-sun');
                        if (themeToggler.classList.contains('fa-sun')) {
                            window.localStorage.setItem('imageUrl', 'https://wallpapercave.com/wp/wp7041961.jpg');
                            url = localStorage.getItem('imageUrl');
                            document.body.classList.add('active');
                            document.body.style.backgroundImage = `url(${url})`;
                        }
                        else {
                            window.localStorage.setItem('imageUrl', 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
                            url = localStorage.getItem('imageUrl');
                            document.body.classList.remove('active');
                            document.body.style.backgroundImage = `url(${url})`;
                        }
                    };
                }
                onSelectorClick() {
                    const selectors = document.querySelectorAll('.selector');
                    [...selectors].map(item => {
                        item.classList.add('active');
                        item.addEventListener('click', (e) => {
                            item.classList.toggle('active');
                            if (e.target.classList.contains('selector__option')) {
                                const optionContent = e.target.textContent;
                                if (+optionContent[0]) {
                                    this.dayRangeValue = +optionContent[0];
                                }
                                else {
                                    this.searchByDayNameValue = optionContent;
                                }
                            }
                        });
                    });
                }
                handlerWeatherDetailed() {
                    this.daysRow.addEventListener('click', (e) => {
                        this.onWeatherDetailedChanged(e.target.parentElement.id || e.target.id);
                    });
                }
                createElementsList() {
                    let detailedCardElements = [];
                    let daysCardList = [];
                    for (let i = 1; i < 7; i++) {
                        this[`parametr${i}`] = this.createElement('p', 'detailed-day__card-content');
                        this[`parametrDescription${i}`] = this.createElement('p', 'detailed-day__card-content');
                        this[`detailedCard${i}`] = this.createElement('div', 'detailed-day__card');
                        detailedCardElements.push({
                            parametr: this[`parametr${i}`],
                            parametrDescription: this[`parametrDescription${i}`],
                            detailedCard: this[`detailedCard${i}`]
                        });
                    }
                    for (let i = 1; i < 8; i++) {
                        this[`nameOfDay${i}`] = this.createElement('div', 'main__day-name');
                        this[`iconWrapper${i}`] = this.createElement('img', 'main__day-icon');
                        this[`temp${i}`] = this.createElement('div', 'main__day-temperature');
                        this[`wrapper${i}`] = this.createElement('div', 'main__day');
                        i === 1 ? this[`wrapper${i}`].classList.add('active') : null;
                        daysCardList.push({
                            nameOfDay: this[`nameOfDay${i}`],
                            iconWrapper: this[`iconWrapper${i}`],
                            temp: this[`temp${i}`],
                            wrapper: this[`wrapper${i}`]
                        });
                    }
                    return { detailedCardElements, daysCardList };
                }
                appendElements(type, selectedDaysCount) {
                    let { detailedCardElements, daysCardList } = this.elementsList;
                    let container;
                    if (type === 'detailCard') {
                        container = this.createElement('div', 'detailed-day__right');
                        detailedCardElements.map(item => {
                            let { parametr, parametrDescription, detailedCard } = item;
                            detailedCard.append(parametr, parametrDescription);
                            container.append(detailedCard);
                        });
                        return container;
                    }
                    else {
                        container = this.createElement('div', 'main__days');
                        let selectedDays = daysCardList.slice(0, selectedDaysCount);
                        selectedDays.map(item => {
                            let { nameOfDay, iconWrapper, temp, wrapper } = item;
                            wrapper.append(nameOfDay, iconWrapper, temp);
                            container.append(wrapper);
                        });
                        return container;
                    }
                }
                createElement(tag, className, additionClassName, id) {
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
                getElement(selector) {
                    return document.querySelector(selector);
                }
                reverseDate(date) {
                    return date.split('-').reverse().join('/');
                }
                addSelectorOptions(contentList) {
                    let optionsList = this.createElement('div', 'selector__options-list');
                    contentList.map((text) => {
                        let option = this.createElement('div', 'selector__option');
                        option.textContent = `${text}`;
                        optionsList.append(option);
                    });
                    return optionsList;
                }
                createDataList(data, typeOfList) {
                    let contentList = [];
                    let degreesCelcius = String.fromCodePoint(8451);
                    if (typeOfList === 'detailedCard') {
                        let { humidity, temperatureF, temperature, wind, sunset, sunrise } = data;
                        contentList = [
                            { Humidity: `${humidity} %` },
                            { ['Temperature F']: ` ${temperatureF} F` },
                            { ['Max temp']: `${temperature}${degreesCelcius}` },
                            { Wind: `${wind} mpH` },
                            { Sunset: sunset },
                            { Sunrise: sunrise }
                        ];
                    }
                    else {
                        data.map((item) => {
                            let { id, dayName, icon, temperature } = item;
                            let data = { id, dayName, icon, temperature };
                            contentList.push(data);
                        });
                    }
                    return contentList;
                }
                setContext(contentList, type) {
                    let degreesCelcius = String.fromCodePoint(8451);
                    let { detailedCardElements, daysCardList } = this.elementsList;
                    if (type === 'detailCard') {
                        for (let i = 0; i < contentList.length; i++) {
                            let { parametr, parametrDescription } = detailedCardElements[i];
                            parametr.textContent = `${Object.keys(contentList[i])}`;
                            parametrDescription.textContent = `${Object.values(contentList[i])}`;
                        }
                    }
                    else {
                        for (let i = 0; i < (contentList === null || contentList === void 0 ? void 0 : contentList.length); i++) {
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
                    var _a, _b;
                    let activeElement = elementsList.find((item) => item.wrapper.classList.contains('active'));
                    (_a = activeElement === null || activeElement === void 0 ? void 0 : activeElement.wrapper) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
                    let element = elementsList === null || elementsList === void 0 ? void 0 : elementsList.find((item) => +item.wrapper.id === current.id);
                    (_b = element === null || element === void 0 ? void 0 : element.wrapper) === null || _b === void 0 ? void 0 : _b.classList.add('active');
                }
                displayWeatherDays(days, current, location) {
                    this.selectedDaysCount = days.length;
                    if (!days.length && !!current) {
                        const message = this.createElement('p', 'main__message');
                        message.textContent = 'No data available';
                        this.app.append(message);
                    }
                    else {
                        this.cityName.textContent = `${location}`;
                        this.date.textContent = `${current === null || current === void 0 ? void 0 : current.dayName}  ${this.reverseDate(current === null || current === void 0 ? void 0 : current.date)}`;
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
            };
            exports_12("View", View);
        }
    };
});
System.register("components/weather/weather.controller.creator", ["components/weather/weather.controller", "components/weather/weather.model", "components/weather/weather.model.creator", "components/weather/weather.view"], function (exports_13, context_13) {
    "use strict";
    var weather_controller_1, weather_model_1, weather_model_creator_1, weather_view_1, WeatherControllerCreator;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (weather_controller_1_1) {
                weather_controller_1 = weather_controller_1_1;
            },
            function (weather_model_1_1) {
                weather_model_1 = weather_model_1_1;
            },
            function (weather_model_creator_1_1) {
                weather_model_creator_1 = weather_model_creator_1_1;
            },
            function (weather_view_1_1) {
                weather_view_1 = weather_view_1_1;
            }
        ],
        execute: function () {
            WeatherControllerCreator = class WeatherControllerCreator {
                setData(days, dayNames) {
                    let daysList, detailedDaysList;
                    let { location, forecast: { forecastday } } = days;
                    for (let i = 0; i < forecastday.length; i++) {
                        forecastday[i].dayName = dayNames[i];
                        ({
                            daysList,
                            detailedDaysList
                        } = new weather_model_creator_1.default().createDayModels(forecastday)[length]);
                    }
                    new weather_controller_1.Controller(new weather_model_1.default(daysList, detailedDaysList, location.name), new weather_view_1.View());
                }
            };
            exports_13("default", WeatherControllerCreator);
        }
    };
});
System.register("components/weather/weather.service", [], function (exports_14, context_14) {
    "use strict";
    var WeatherService;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
            WeatherService = class WeatherService {
                async getData() {
                    return fetch("https://api.weatherapi.com/v1/forecast.json?key=0b0abb10060749e699c41724221710&q=London&days=7&aqi=no&alerts=no")
                        .then(res => res.json())
                        .then(data => data)
                        .catch(err => console.log(`Error: ${err}`));
                }
            };
            exports_14("default", WeatherService);
        }
    };
});
System.register("index", ["components/weather/weather.controller.creator", "components/weather/weather.service"], function (exports_15, context_15) {
    "use strict";
    var weather_controller_creator_1, weather_service_1, rangeDays, searchByDayName, dayNames, weatherService;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (weather_controller_creator_1_1) {
                weather_controller_creator_1 = weather_controller_creator_1_1;
            },
            function (weather_service_1_1) {
                weather_service_1 = weather_service_1_1;
            }
        ],
        execute: function () {
            exports_15("rangeDays", rangeDays = ['2 days', '4 days', '6 days', '7 days']);
            exports_15("searchByDayName", searchByDayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
            exports_15("dayNames", dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
            weatherService = new weather_service_1.default();
            weatherService.getData()
                .then((days) => {
                if (days) {
                    new weather_controller_creator_1.default().setData(days, dayNames);
                }
                else {
                    console.log('Server not working!!!');
                }
            });
        }
    };
});
System.register("components/weather/core/interfaces/controller.interface", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map