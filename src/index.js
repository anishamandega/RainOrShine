function displayTemperature(response) {
    let temperatureElement = document.querySelector("#weather-temperature");
    let temperature = response.data.temperature.current;
    let feelsLikeElement = document.querySelector("#weather-feels");
    feelsLike = response.data.temperature.feels_like;
    let cityElement = document.querySelector("#weather-city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity-text");
    let windSpeedElement = document.querySelector("#wind-text");
    let timeElement = document.querySelector("#weather-app-datetime");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-icon");

    cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    feelsLikeElement.innerHTML = `Feels Like ${Math.round(feelsLike)}°`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "85f4f144e1e190049f03f1t0fa2f6obb";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");

    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "85f4f144e1e190049f03f1t0fa2f6obb";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = `<div id="weather-daily">Forecast For 5 Days</div>`;

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml =
                forecastHtml +
                `
                 
      <div class="row align-items-center">
            <div class="col-4">${formatDay(day.time)}</div>
                <div class="col-4"><img id="weather-daily-icon"src="${day.condition.icon_url}" alt="${day.condition.description}" /></div>
                <div class="col-4">
                    <strong id="weather-temperature-max">${Math.round(day.temperature.maximum)}º  </strong>|
                    <span class="weather-forecast-temperature" id="weather-temperature-mini">  ${Math.round(day.temperature.minimum)}º</span>
                </div>
            </div>
    `;
        }
    });

    let forecastElement = document.querySelector("#weather-app-forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);


searchCity("Cape Town");