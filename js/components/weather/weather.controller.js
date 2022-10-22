class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;


        this.model.bindWeatherListChanged(this.onWeatherChangedList);

        this.onWeatherChangedList(this.model.daysList, this.model.current, this.model.location);

        this.view.bindEditDetailedDay(this.handleDayClicked);
        this.view.bindSelectorClicked(this.handleSelectorClicked);
    }

    onWeatherChangedList = (days, current, location) => {
        console.log(this.model, this.view)
        this.view.displayWeatherDays(days, current, location);
    }

    handleDayClicked = id => {
        this.model.detailedWeatherChanged(id);
    }

    handleSelectorClicked = (dayRange, daysBySearch) => {
        this.model.selectorClicked(dayRange, daysBySearch);
    }
}