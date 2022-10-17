class WeatherControllerCreator {
    
    setData(handler, dayNames) {
        let daysList, detailedDaysList;
        handler()
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
                    } = new WeatherModelCreator().createDayModels(forecastday)[length]);
                }
                new Controller(new Model(daysList, detailedDaysList, location.name), new View());
            })
    }
}