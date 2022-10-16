class WeatherService {
    getData() {
        return fetch("https://api.weatherapi.com/v1/forecast.json?key=333b71fbcd1b4dc891853646220210&q=London&days=7&aqi=no&alerts=no")
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(`Error: ${err}`))
    }
}
