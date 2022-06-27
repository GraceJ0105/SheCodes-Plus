function changeTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  roundedCelsiusTemp = Math.round(response.data.main.temp);
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
  temperatureElement.innerHTML = `${roundedCelsiusTemp}`;
  cityName.innerHTML = `${response.data.name}`;
  let weatherImageIcon = response.data.weather[0].icon;
  if (unitChangeToFahrenheit.classList.contains("active")) {
    unitChangeToCelsius.classList.add("active");
    unitChangeToFahrenheit.classList.remove("active");
  }

  formatMainWeatherImage(weatherImageIcon);
  getForecast(response);
}

function formatMainWeatherImage(weatherImageIcon) {
  let weatherImageElement = document.querySelector("#weather-image");
  if (
    weatherImageIcon === "09d" ||
    weatherImageIcon === "09n" ||
    weatherImageIcon === "10d" ||
    weatherImageIcon === "10n"
  ) {
    weatherImageElement.setAttribute("src", "images/rain.png");
  } else if (weatherImageIcon === "01d" || weatherImageIcon === "01n") {
    weatherImageElement.setAttribute("src", "images/sunny.png");
  } else if (weatherImageIcon === "02d" || weatherImageIcon === "02n") {
    weatherImageElement.setAttribute("src", "images/overcast.png");
  } else if (
    weatherImageIcon === "03d" ||
    weatherImageIcon === "03n" ||
    weatherImageIcon === "04d" ||
    weatherImageIcon === "04n"
  ) {
    weatherImageElement.setAttribute("src", "images/cloudy.png");
  } else if (weatherImageIcon === "13d" || weatherImageIcon === "13n") {
    weatherImageElement.setAttribute("src", "images/snow.png");
  } else if (weatherImageIcon === "11d" || weatherImageIcon === "11n") {
    weatherImageElement.setAttribute("src", "images/thunderstorm.png");
  } else if (weatherImageIcon === "50d" || weatherImageIcon === "50n") {
    weatherImageElement.setAttribute("src", "images/mist.png");
  }
}

function getForecast(coordinates) {
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.data.coord.lat}&lon=${coordinates.data.coord.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-row");
  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let forecastWeatherIconHTML = "";
      if (
        forecastDay.weather[0].icon === "09d" ||
        forecastDay.weather[0].icon === "09n" ||
        forecastDay.weather[0].icon === "10d" ||
        forecastDay.weather[0].icon === "10n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/rain.png"
                      alt="rainy"
                      class="forecast-image"
                    />`;
      } else if (
        forecastDay.weather[0].icon === "01d" ||
        forecastDay.weather[0].icon === "01n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/sunny.png"
                      alt="sunny"
                      class="forecast-image"
                    />`;
      } else if (
        forecastDay.weather[0].icon === "02d" ||
        forecastDay.weather[0].icon === "02n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/overcast.png"
                      alt="overcast"
                      class="forecast-image"
                    />`;
      } else if (
        forecastDay.weather[0].icon === "03d" ||
        forecastDay.weather[0].icon === "03n" ||
        forecastDay.weather[0].icon === "04d" ||
        forecastDay.weather[0].icon === "04n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/cloudy.png"
                      alt="cloudy"
                      class="forecast-image"
                    />`;
      } else if (
        forecastDay.weather[0].icon === "13d" ||
        forecastDay.weather[0].icon === "13n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/snow.png"
                      alt="snow"
                      class="forecast-image"
                    />`;
      } else if (
        forecastDay.weather[0].icon === "11d" ||
        forecastDay.weather[0].icon === "11n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/thunderstorm.png"
                      alt="thunder"
                      class="forecast-image"
                    />`;
      } else if (
        forecastDay.weather[0].icon === "50d" ||
        forecastDay.weather[0].icon === "50n"
      ) {
        forecastWeatherIconHTML = `  <img
                      src="images/mist.png"
                      alt="mist"
                      class="forecast-image"
                    />`;
      }
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="future-day">${formatTimestamp(forecastDay.dt)}</div>
               
                <div class="futureTemp">
                  <span class="future-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°C</span>
                  <span class="future-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°C</span> </div>
                  <div class="futureWeatherIcon">${forecastWeatherIconHTML}</div>                
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "02a3e153b68431fbb188627f7c3c24b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  let fahrenheitTemperature = (roundedCelsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  unitChangeToCelsius.classList.remove("active");
  unitChangeToFahrenheit.classList.add("active");
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = roundedCelsiusTemp;
  unitChangeToFahrenheit.classList.remove("active");
  unitChangeToCelsius.classList.add("active");
}

let roundedCelsiusTemp = null;

let currentLocationButton = document.querySelector("#current-weather-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#user-city-form");
form.addEventListener("submit", handleSubmit);

let unitChangeToFahrenheit = document.querySelector("#fahrenheit-temp");
unitChangeToFahrenheit.addEventListener("click", changeToFahrenheit);

let unitChangeToCelsius = document.querySelector("#celsius-temp");
unitChangeToCelsius.addEventListener("click", changeToCelsius);

changeTime();
search("Paris");
