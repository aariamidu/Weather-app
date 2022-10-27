//part 1
let now = new Date();
let real = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
real.innerHTML = `${currentDay}, ${hours}:${min}`;

//part 2
function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", cityName);

//part 3

function showWeather(respond) {
  document.querySelector("#mainTemp").innerHTML = Math.round(
    respond.data.main.temp
  );
  document.querySelector("#city").innerHTML = respond.data.name;
  document.querySelector("#humidity").innerHTML = respond.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    respond.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    respond.data.weather[0].main;
  let h1 = document.querySelector("h1");

  h1.innerHTML = respond.data.name;
  function toFahrenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#mainTemp");
    temperature.innerHTML = Math.round(respond.data.main.temp * 1.8) + 32;
  }
  let fahrenheit = document.querySelector("#°f");
  fahrenheit.addEventListener("click", toFahrenheit);

  function toCelcius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#mainTemp");
    temperature.innerHTML = Math.round(respond.data.main.temp);
  }
  let celcius = document.querySelector("#°c");
  celcius.addEventListener("click", toCelcius);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let log = position.coords.longitude;
  let apiKey = "0c085d3ada3bf2ca7752d573067ce72f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationB = document.querySelector("#cityButton");
currentLocationB.addEventListener("click", currentLocation);

function searchCity(city) {
  let apiKey = "0c085d3ada3bf2ca7752d573067ce72f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function Submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#form-search");
searchForm.addEventListener("click", Submit);

searchCity("London,UK");
