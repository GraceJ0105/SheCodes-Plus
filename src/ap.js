function changeTime() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri"];
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
  let currentDate = `${day} ${month} ${date}, ${year}, ${hours}:${minutes}`;
  let changeCurrentTime = document.querySelector("#today-date");
  changeCurrentTime.innerHTML = `${currentDate}`;
}

changeTime();

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

let form = document.querySelector("#user-city-form");
form.addEventListener("submit", userCityAlert);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let temperatureElement = document.querySelector("#today-temp");
  let currentCity = document.querySelector("#current-city-name");
  temperatureElement.innerHTML = roundedTemp;
  currentCity.innerHTML = city;
}
navigator.geolocation.getCurrentPosition(showPosition);

let currentLocation = document.querySelector("#current-weather");
currentLocation.addEventListener = ("click", currentWeather);

//{"coord":{"lon":-123.156,"lat":49.2705},
//"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
//"base":"stations",
//"main":{"temp":9.58,"feels_like":8.28,"temp_min":6.88,"temp_max":11.99,"pressure":1032,"humidity":73},
//"visibility":10000,
//"wind":{"speed":2.57,"deg":280},
//"clouds":{"all":75},
//"dt":1646613611,
//"sys":{"type":2,
//"id":2011597,
//"country":"CA",
//"sunrise":1646577887,
//"sunset":1646618592},
//"timezone":-28800,
//"id":6173331,
//"name":"Vancouver",
//"cod":200}
