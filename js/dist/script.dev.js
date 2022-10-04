"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weather = function Weather(id, dayName, temperature, mainDescription, description) {
  _classCallCheck(this, Weather);

  this.id = id;
  this.dayName = dayName;
  this.temperature = temperature;
  this.mainDescription = mainDescription;
  this.description = description;
};

var WeatherDetailed =
/*#__PURE__*/
function (_Weather) {
  _inherits(WeatherDetailed, _Weather);

  function WeatherDetailed(id, dayName, temperature, mainDescription, description, wind, visibility, pressure, humidity, feelsLike, icon) {
    var _this;

    _classCallCheck(this, WeatherDetailed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WeatherDetailed).call(this, id, dayName, temperature, mainDescription, description));
    _this.wind = wind;
    _this.visibility - visibility;
    _this.pressure = pressure;
    _this.humidity = humidity;
    _this.feelsLike = feelsLike;
    _this.icon = icon;
    return _this;
  }

  return WeatherDetailed;
}(Weather);

var Model = function Model() {
  _classCallCheck(this, Model);
};

var View = function View() {
  _classCallCheck(this, View);
};

var Controller = function Controller(model, view) {
  _classCallCheck(this, Controller);

  this.model = model;
  this.view = view;
};

var app = new Controller(new Model(), new View());
console.log(app);
fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=fec80268720ae2fa19228fac883ec193").then(function (response) {
  return response.json();
}).then(function (result) {
  return console.log(result);
})["catch"](function (error) {
  return console.log('error', error);
}); // http://openweathermap.org/img/wn/10d@2x.png  for get icon