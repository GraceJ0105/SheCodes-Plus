function changeTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = days[now.getDay()];
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let nowTime = `${day}, ${hours}:${minutes}`;
  let currentDate = `${month} ${date}, ${year}`;
  let changeNowTime = document.querySelector("#now-time");
  changeNowTime.innerHTML = `${nowTime}`;
  let changeCurrentDate = document.querySelector("#today-date");
  changeCurrentDate.innerHTML = `${currentDate}`;
}

function userCityAlert(event) {
  event.preventDefault();
  let city = document.querySelector("#user-city-input");
  let cityName = document.querySelector("h2.city");
  cityName.innerHTML = `${city.value}`;
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = `${roundedTemp}`;
}

function currentWeather(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let temperatureElement = document.querySelector("#today-temp");
  let currentCity = document.querySelector("#current-city-name");
  temperatureElement.innerHTML = roundedTemp;
  currentCity.innerHTML = city;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

changeTime();

let form = document.querySelector("#user-city-form");
form.addEventListener("submit", userCityAlert);

let currentLocation = document.querySelector("#current-weather");
currentLocation.addEventListener = ("click", getCurrentLocation);
