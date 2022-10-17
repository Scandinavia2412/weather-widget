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
        console.log(id)
        const choosedWeather = this.detailedDaysList.find(item => item.id === +id)
        this.current = choosedWeather;
        this.commitOnWeatherListChanged(this.daysList, this.current, this.location)
    }
    
    commitOnWeatherListChanged(days, detailedDay, location) {
        this.onWeatherListChanged(days, detailedDay, location)
    }   

    selectorClicked(dayRange = 7, daysBySearch = this.current.dayName) {     
        this.daysByRange = this.daysList.slice(0,dayRange);
        this.daysBySearch = this.detailedDaysList.find(day => day.dayName === daysBySearch);
        this.commitOnWeatherListChanged(this.daysByRange, this.daysBySearch, this.location)
    }
}