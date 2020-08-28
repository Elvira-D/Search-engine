import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setForecast({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4820a880cf32920cd905490b92fa0630&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form id="app" className="search" onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div className="App">
        {form}
        <ul>
          <li>Temperature: {Math.round(forecast.temperature)}°C</li>
          <li>Description: {forecast.description}</li>
          <li>Humidity: {forecast.humidity}%</li>
          <li>Wind: {forecast.wind}km/h</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
