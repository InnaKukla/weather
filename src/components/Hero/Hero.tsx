import React from "react";
import { WeatherDataType } from "../../shared/fetchWeather";

interface HeroProps {
    weatherData?: WeatherDataType | null
}

const Hero: React.FC<HeroProps> = ({ weatherData }) => {
    if (!weatherData) return null;
    const { name, main, weather } = weatherData;
    console.log(weatherData);


    return (
        <div className={`flex flex-col items-center`}>
            <h2 className="text-[60px] mt-14 md:mt-16">{name}</h2>

            <p className="text-[74px]">{Math.round(main?.temp)}°C</p>
            <p className="text-[22px]">
                Відчувається як: {Math.round(main?.feels_like)}°C
            </p>
            <p className="text-[24px]">
                {weather &&
                    weather[0].description?.charAt(0).toUpperCase() +
                    weather[0]?.description?.slice(1)}
            </p>
        </div>
    );
};

export default Hero;
