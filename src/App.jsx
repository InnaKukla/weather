import React, { useEffect, useState } from "react";
import WeatherData from "./WeatherData";

const API_KEY = "7e12feb07232d4a50245bf4f2d33714e";

const bgType = {
  Clouds: "./images/cloudy2.jpg",
  Rain: "./images/rain.webp",
  Clear: "./images/clear.jpg",
  Snow: "./images/snow.jpg",
  Default: "./images/default.png",
};
const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const cacheTime = 10 * 60 * 1000;

  useEffect(() => {
    const storageCity = JSON.parse(localStorage?.getItem("city"));

    if (storageCity && storageCity !== undefined) {
      fetchWeather(storageCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let newBg;

    if (weatherData?.weather) {
      newBg = bgType[weatherData?.weather[0]?.main];
    } else {
      newBg = bgType.Default;
    }
    const img = new Image();
    img.src = newBg;

    img.onload = () => {
      document.body.style.transition = "background-image 1s easy-in-out";
      document.body.style.backgroundImage = `url(${newBg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    };
  }, [weatherData]);

  const fetchWeather = async (storageCity) => {
    const queryCity = storageCity || city;

    if (!queryCity) return;

    const key = `weather_${queryCity?.toLowerCase()}`;
    const nowTime = Date.now();
    const cacheWeather = localStorage.getItem(key);

    if (cacheWeather) {
      const cacheParsed = JSON.parse(cacheWeather);
      if (nowTime - cacheParsed.timestamp < cacheTime) {
        setWeatherData(cacheParsed.data);
        localStorage.setItem(
          "city",
          JSON.stringify(cacheParsed.data.name || "")
        );
        setCity("");

        return;
      }
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${API_KEY}&units=metric&lang=uk`
      );
      const data = await res.json();
      if (data.code !== 404) {
        setWeatherData(data);
        console.log(city);
        localStorage.setItem(key, JSON.stringify({ data, timestamp: nowTime }));

        localStorage.setItem("city", JSON.stringify(queryCity || ""));

        setCity("");
      }
      setError(data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col px-4 mt-10 mb-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative ">
      <header className="flex items-center justify-around z-100">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-black to-[#ffffff85] bg-clip-text text-transparent">
          W   eather
        </h1>
        <div className="flex gap-1">
          <input
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchWeather();
            }}
            placeholder="Назва населеного пункту, країни чи регіону"
            autoComplete="off"
            className="ring-1 ring-gray-300 rounded-md w-[150px] sm:w-[350px] md:w-[450px] lg:w-[600px] p-2 outline-gray-300 bg-color-[#fff] text-[#75777a]"
          />
          <button
            onClick={fetchWeather}
            disabled={city === ""}
            className="cursor-pointer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/icons/search-white.svg`}
              alt="search icon"
              className="color-white"
            />
          </button>
        </div>
      </header>
      {error && (
        <div className="mt-[150px] text-[50px] font-normal text-gray-500 mx-auto">
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </div>
      )}
      <WeatherData data={weatherData} />
    </div>
  );
};
export default App;
