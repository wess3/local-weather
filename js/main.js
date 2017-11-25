/*
  potrebujes zmenit farbu pozadia textu na sedu ak je snow
*/
"use strict";

(() => {
  const text = document.getElementById("border");
  let cityName = "";
  let cityWeather = "";
  let cityTemperature = "";

  // Find Latitude And Longitude
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getPosition(position);
      getWeather(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  // Get City Name
  function getPosition(position) {
    const positionUrl =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyB_PEihrvb06G0hGNd8xF4cZa37qhpB8gw`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', positionUrl, true);
    xhr.onload = () => {
      if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText);
        cityName = data.results[0].address_components[4].long_name;
      }
    }
    xhr.send();
  }

  // Get Temperature And Weather
  function getWeather(position) {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=69d36a5e934afb5f52faa7defbdea27c&units=metric`;
    console.log(weatherUrl);
    const xhr = new XMLHttpRequest();

    xhr.open('GET', weatherUrl, true);
    xhr.onload = () => {
      if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText);

        cityWeather = data.weather[0].main.toLowerCase();
        cityTemperature = Math.round(data.main.temp) + "°C";
        text.innerHTML = cityName + " * " + cityTemperature;
        updateBackground();
      }
    }
    xhr.send();
  }

  // Change Background
  function updateBackground() {
    cityWeather = "thunderstorm";
    if (cityWeather === "mist" || cityWeather === "snow") {
      text.style.backgroundColor = "#000";
      text.style.color = "#fff";
    }
    document.body.style.backgroundImage = `url(../img/${cityWeather}.jpeg)`;
  }

})();





// THE END
