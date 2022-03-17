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

function search(city) {
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#user-city-input");
  search(city.value);
}

function updateWeather(response) {
  let cityName = document.querySelector("#current-city-name");
  let roundedTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp");
  let conditionElement = document.querySelector("#weather-condition");
  let condition = response.data.weather[0].main;
  let windElement = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);
  let feelsLikeElement = document.querySelector("#feels-like-temp");
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = `${feelsLikeTemp}`;
  windElement.innerHTML = `${wind}`;
  conditionElement.innerHTML = `${condition}`;
  temperatureElement.innerHTML = `${roundedTemp}`;
  cityName.innerHTML = `${response.data.name}`;
  //let sunrise = response.data.sys.sunrise;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  //let date = new Date(sunrise * 1000);
  // Hours part from the timestamp
  //let hours = date.getHours();
  // Minutes part from the timestamp
  //let minutes = "0" + date.getMinutes();
  // Will display time in 10:30 format
  //let formattedSunriseTime = hours + ":" + minutes.substr(-2);
  // expected output "3:19:27 PM"
  //console.log(formattedSunriseTime);
}

function showPosition(position) {
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

changeTime();

let currentLocation = document.querySelector("#current-weather");
currentLocation.addEventListener = ("click", getCurrentLocation);

let form = document.querySelector("#user-city-form");
form.addEventListener("submit", handleSubmit);
