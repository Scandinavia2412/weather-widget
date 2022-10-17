class WeatherModelCreator {
    
     createDayModels(data) {
        let daysList = [];
        let detailedDaysList = [];
        let icon = '';
        const result = data.map((day, index) => {
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
            } else if (text === 'Sunny') {
                icon = 'images/icons/2.png'
                icon = 'images/icons/3.png'
            } else {
                icon = 'images/icons/1.png'
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
}