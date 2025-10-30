import React from "react";

const directionsArray = [
  "Пн",
  "Пн-Сх",
  "Сх",
  "Пд-Сх",
  "Пд",
  "Пд-Зх",
  "Зх",
  "Пн-Зх",
];

const WeatherData = ({ data }) => {

  if ((data?.cod === '404') || !data) return;

  const { name, main, wind, weather, sys, visibility } = data;
  const sunrise = sys?.sunrise;
  const sunset = sys?.sunset;
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  const direction = directionsArray[Math.round(wind?.deg / 45) % 8];

  return (
    <div className={`flex flex-col items-center`}>
      <h2 className="text-[60px] mt-20">{name}</h2>

      <p className="text-[80px]">{Math.round(main?.temp)}°C</p>
      <p className="text-[24px]">
        Відчувається як: {Math.round(main?.feels_like)}°C
      </p>
      <p className="text-[24px]">
        {weather &&
          weather[0].description?.charAt(0).toUpperCase() +
            weather[0]?.description?.slice(1)}
      </p>

      <div className="flex items-center gap-20 mt-10 border border-solid rounded-2xl border-[#3f718b94] p-[16px] bg-[#3f718b94]">
        <p className="text-white font-semibold text-xl">
          Схід сонця: {sunriseDate?.toLocaleTimeString("uk-UA")}
        </p>
        <p className="text-white font-semibold text-xl">
          Захід сонця: {sunsetDate?.toLocaleTimeString("uk-UA")}
        </p>
      </div>

      <div className="flex justify-between items-center gap-[35px] md:gap-[60px] lg:gap-[70px]">
        {" "}
        <div className="mt-10 border border-solid rounded-2xl border-indigo-200 p-[16px] border border-solid rounded-2xl border-[#3f718b94] bg-[#3f718b94]">
          <p className="text-white font-semibold text-xl">
            Вологість
            <br />
            {main?.humidity}%
          </p>
        </div>
        <div className="mt-10 border border-solid rounded-2xl border-indigo-200 p-[16px] border border-solid rounded-2xl border-[#3f718b94] bg-[#3f718b94]">
          <p className="text-white font-semibold text-xl">
            Видимість
            <br />
            {visibility / 1000}км
          </p>
        </div>
      </div>

      <div className="mt-10 border border-solid rounded-2xl border border-solid rounded-2xl border-[#3f718b94] bg-[#3f718b94] p-[16px]">
        {" "}
        <p className="flex justify-between items-center text-white font-semibold text-xl">
          Вітер <span>{Math.round(wind?.speed)} м/с</span>
        </p>
        {wind?.gust ? (
          <p className="flex justify-between items-center text-white font-semibold text-xl">
            Пориви вітру <span>{Math.round(wind?.gust)} м/с</span>
          </p>
        ) : (
          ""
        )}
        <p className="flex justify-between items-center text-white font-semibold text-xl">
          Напрямок вітру{" "}
          <span className="ml-[20px]">
            {Math.round(wind?.deg)}° {direction}
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeatherData;
