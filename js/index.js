let rangeDays = ['2 days', '4 days', '6 days', '7 days'];
let searchByDayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let weatherService = new WeatherService();

weatherService.getData()
   .then((days) => {
      if (days) {
         new WeatherControllerCreator().setData(days, dayNames);
      } else {
         console.log('Server not working!!!')
      }
   });