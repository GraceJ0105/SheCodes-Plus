let weather = [
  {
    name: "paris",
    temp: 19.7,
    humidity: 80,
  },
  {
    name: "tokyo",
    temp: 17.3,
    humidity: 50,
  },
  {
    name: "lisbon",
    temp: 30.2,
    humidity: 20,
  },
  {
    name: "san francisco",
    temp: 20.9,
    humidity: 100,
  },
  {
    name: "moscow",
    temp: -5,
    humidity: 20,
  },
];

// write your code here

function cityWeather() {
  let userCity = prompt("Enter a city");
  {
    if (userCity === weather[0].name) {
      alert(
        `It is currently ${Math.round(
          weather[0].temp
        )}°C in ${userCity} with a humidity of ${weather[0].humidity}%`
      );
    } else if (userCity === weather[1].name) {
      alert(
        `It is currently ${Math.round(
          weather[1].temp
        )}°C in ${userCity} with a humidity of ${weather[1].humidity}%`
      );
    } else if (userCity === weather[2].name) {
      alert(
        `It is currently ${Math.round(
          weather[2].temp
        )}°C in ${userCity} with a humidity of ${weather[2].humidity}%`
      );
    } else if (userCity === weather[3].name) {
      alert(
        `It is currently ${Math.round(
          weather[3].temp
        )}°C in ${userCity} with a humidity of ${weather[3].humidity}%`
      );
    } else if (userCity === weather[4].name) {
      alert(
        `It is currently ${Math.round(
          weather[4].temp
        )}°C in ${userCity} with a humidity of ${weather[4].humidity}%`
      );
    } else {
      alert(
        `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity}`
      );
    }
  }
}

cityWeather();
