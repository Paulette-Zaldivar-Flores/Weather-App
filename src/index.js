let now = new Date();
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");

let date = now.getDate();
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = now.getHours();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h3.innerHTML = `${day}, ${month} ${date}, ${year}`;

h4.innerHTML = `${hour}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${city}`;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let currentHumid = document.querySelector("#humidity");
  currentHumid.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}`;
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = Math.round(response.data.main.temp);
}

function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let searchInput = document.querySelector("#search-text-input");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "b81e7138d4f18ecdce4149c89f6f0058";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  linkCelsius.classList.remove("active");
  linkFahrenheit.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  linkCelsius.classList.add("active");
  linkFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class = "row"> `;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                        <div class="date">${day}</div>
                        <img
                          src="https://ssl.gstatic.com/onebox/weather/48/snow_s_rain.png"
                          alt=""
                          width="36"
                        />
                        <div class="temperature">
                          <span class="min"> -1° </span>
                          <span class="max"> 0° </span>
                        </div>
                      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

let linkFahrenheit = document.querySelector("#fahrenheit-link");
linkFahrenheit.addEventListener("click", convertToFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusTemperature = null;

let linkCelsius = document.querySelector("#celsius-link");
linkCelsius.addEventListener("click", convertToCelsius);
