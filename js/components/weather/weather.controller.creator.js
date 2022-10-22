class WeatherControllerCreator {

    setData(days, dayNames) {
        let daysList, detailedDaysList;
        let {
            location,
            forecast: {
                forecastday
            }
        } = days;
        for (let i = 0; i < forecastday.length; i++) {
            forecastday[i].dayName = dayNames[i];
            ({
                daysList,
                detailedDaysList
            } = new WeatherModelCreator().createDayModels(forecastday)[length]);
        }
        new Controller(new Model(daysList, detailedDaysList, location.name), new View());
    }
}