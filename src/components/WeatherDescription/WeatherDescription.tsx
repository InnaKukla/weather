import React from "react";
import WeatherWind from "../WeatherWind/WeatherWind";
import { WeatherDataProps } from "../../shared/interfaces";




const WeatherDescription: React.FC<WeatherDataProps> = ({ weatherData }) => {

  if (weatherData?.cod === '404' || !weatherData) return null;

  const { main, sys, visibility } = weatherData;
  const sunrise = sys?.sunrise;
  const sunset = sys?.sunset;
  const sunriseDate = new Date((sunrise ?? 0) * 1000);
  const sunsetDate = new Date((sunset ?? 0) * 1000);


  return (
    <div className={`flex flex-col items-center`}>
      <div className="flex items-center  gap-20 mt-10 border border-solid rounded-2xl border-[#3f718b94] p-[16px] bg-[#3f718b94]">
        <p className="text-white font-semibold text-xl">
          Схід сонця: {sunriseDate?.toLocaleTimeString("uk-UA")}
        </p>
        <p className="text-white font-semibold text-xl">
          Захід сонця: {sunsetDate?.toLocaleTimeString("uk-UA")}
        </p>
      </div>

      <div className="xl:flex xl:gap-20 xl:items-start">
        <div className="flex justify-between items-center gap-[35px] md:gap-[60px] lg:gap-[70px] xl:flex-col xl:gap-0 xl:flex xl:flex-1">
          <div className="mt-10 flex flex-col xl:flex-row gap-2 p-[16px] border border-solid rounded-2xl border-[#3f718b94] bg-[#3f718b94] ">
            <p className="text-white font-semibold text-xl">Вологість</p>
            <p className="text-white font-semibold text-xl">
              {main?.humidity}%
            </p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row gap-2 xl:mt-3 p-[16px] border border-solid rounded-2xl border-[#3f718b94] bg-[#3f718b94]">
            <p className="text-white font-semibold text-xl">Видимість</p>
            <p className="text-white font-semibold text-xl">
              {visibility / 1000}км
            </p>
          </div>
        </div>
        <WeatherWind weatherData={weatherData} />
      </div>
    </div>
  );
};

export default WeatherDescription;
