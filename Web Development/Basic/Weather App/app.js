let weather = {
    apiKey: "ce85aa5b8da810424a5d87693443222b",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, temp_min, temp_max, feels_like} = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".feels-like").innerText =
    "Feels like: " + feels_like + "°C";
      document.querySelector(".min-temp").innerText = "Min Temp: " + temp_min + "°C"; 
      document.querySelector(".max-temp").innerText = "Max Temp: " + temp_max + "°C"; 
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
 

      let backgroundImageUrl;
  if (temp < 0) {
    backgroundImageUrl = "https://plus.unsplash.com/premium_photo-1671462679356-15ed7a622434?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sZHxlbnwwfHwwfHx8MA%3D%3D"; 
  } else if (temp >= 0 && temp < 15) {
    backgroundImageUrl = "https://images.unsplash.com/photo-1579785626308-1ba70c1dd789?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNvbGR8ZW58MHx8MHx8fDA%3D";
  } else if (temp >= 15 && temp < 28) {
    backgroundImageUrl = "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1pbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHww"; 
  } else {
    backgroundImageUrl = "https://images.unsplash.com/photo-1577985759186-0854dfd3f218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D"; 
  }

  document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
  document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Delhi");
