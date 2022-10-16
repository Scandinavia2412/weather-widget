
let rangeDays = ['2 days', '4 days', '6 days', '7 days'];
let searchByDayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

new WeatherControllerCreator().setData(new WeatherService().getData, dayNames)
