function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#currentTemperatureValue");
  let temperature = response.data.temperature.current;
  let currentCityElement = document.querySelector("#currentCity");
  let weatherConditionElement = document.querySelector("#weatherCondition");
  let humidityElement = document.querySelector("#humidityValue");
  let windElement = document.querySelector("#windValue");
  let currentDateElement = document.querySelector("#currentDate");
  let dateElement = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  currentCityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  weatherConditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  currentDateElement.innerHTML = formatDate(dateElement);
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}"
              class="currentTemperature"            
              />`;
}

function formatDate(dateElement) {
  let minutes = dateElement.getMinutes();
  let hours = dateElement.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dateElement.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(currentCity) {
  let apiKey = `ff76a11dtae0639b478d784b09d743ob`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchFormInput");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cape Town");
