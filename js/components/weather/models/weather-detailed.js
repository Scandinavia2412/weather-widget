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