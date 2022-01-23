import React, { useState, useEffect } from "react";
import "./index.css";
import moment from "moment";

const App = () => {
  const apiKey = "aec9fee4a26accaeb55d650fc82fbd07";
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const timezone = weatherData.timezone;
  const timezoneInMinutes = timezone / 60;
  const currentTime = moment().utcOffset(timezoneInMinutes).format("HH:mm:ss");
  const [time, setTime] = useState("");
  const hours = parseInt(`${time[0]}${time[1]}`);

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(currentTime), 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div
      className={
        hours >= 6 && hours <= 18
          ? "app day"
          : hours < 6 || hours > 18
          ? "app night"
          : "app day"
      }
    >
      <main
        className={
          typeof weatherData.main == "undefined"
            ? "default"
            : weatherData.weather[0].main
        }
      >
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
          />
        </div>
        {typeof weatherData.main === "undefined" ? (
          <div className="welcome-message">
            <p>Welcome to weather app! </p><br />
            <p>Enter a city name to start...</p>
          </div>
        ) : (
          <div className="weather-data">
            <p className="city">{weatherData.name}</p>
            <p className="time">{time}</p>
            <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
            <p className="weather">{weatherData.weather[0].main}</p>
          </div>
        )}

        {weatherData.cod === "404" ? (
          <p className="error">City not found! Please try again...</p>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default App;
