class Weather {
    constructor(id, dayName, temperature, description, icon) {
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