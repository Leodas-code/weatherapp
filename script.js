const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "fa0f9840d70be70ccba580744640d17a";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;  // Use correct query parameter format

    const response = await fetch(apiUrl);
   console.log(response);
   if(!response.ok){
    throw new Error("Could ot fetch weather data");
   }

   return await response.json();
}

function displayWeatherInfo(data) {
   const {name: city,
          main: {temp, humidity},
          weather: [{description, id}]} = data;

          card.textContent = "";
          card.style.display = "flex";

          const cityDisplay = document.createElement("h1");
          const tempDisplay = document.createElement("p");
          const humidityDisplay = document.createElement("p");
          const descDisplay = document.createElement("p");
          const WeatherEmoji= document.createElement("p");

          cityDisplay.textContent = city;
          cityDisplay.classList.add("cityDisplay");
          card.appendChild(cityDisplay);

          tempDisplay.textContent = `${temp}°C`;
          tempDisplay.classList.add("tempDisplay");
          card.appendChild(tempDisplay);

          humidityDisplay.textContent = `Humidity: ${humidity}%`;
          humidityDisplay.classList.add("humidityDisplay");
          card.appendChild(humidityDisplay);

          descDisplay.textContent = `${description}`;
          descDisplay.classList.add("descDisplay");
          card.appendChild(descDisplay);

          WeatherEmoji.textContent = getWeatherEmoji(id);
          WeatherEmoji.classList.add("weatherEmoji");
          card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherId) {

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
        return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
        return "🌧️";
        case(weatherId >= 500 && weatherId < 600):
        return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
        return "❄️";
        case(weatherId >= 700 && weatherId < 800):
        return "🌫️";
        case(weatherId === 800):
        return "☀️";
        case(weatherId >= 801 && weatherId < 810):
        return "☁️";
        default:
            return "?";
    }
   
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.innerHTML = ""; // Clear card content
    card.style.display = "flex"; // Ensure card is visible
    card.appendChild(errorDisplay);
}
