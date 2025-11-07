import React from "react";
import { HeroProps } from "../../shared/interfaces";



const Hero: React.FC<HeroProps> = ({ weatherData }) => {

    if (weatherData?.cod === "404" || !weatherData) return null;
    const { name, main, weather } = weatherData;

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
