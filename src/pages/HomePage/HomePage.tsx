import React, { useEffect, useState } from "react";
import { changeBackground } from "../../shared/changeBackground";
import Header from "../../components/Header/Header";
import { fetchWeather, WeatherDataType } from "../../shared/fetchWeather";
import Hero from "../../components/Hero/Hero";
import WeatherDescription from "../../components/WeatherDescription/WeatherDescription";
import Footer from "../../components/Footer/Footer";

const API_KEY = "7e12feb07232d4a50245bf4f2d33714e";

const HomePage = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
    const [error, setError] = useState("");

    const cacheTime = 10 * 60 * 1000;

    useEffect(() => {
        const storageCity: string | null = JSON.parse(
            localStorage?.getItem("city") ?? ""
        );

        if (storageCity && storageCity !== undefined) {
            fetchWeatherFunc(storageCity);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (weatherData) {
            changeBackground(weatherData);
        }
    }, [weatherData]);

    const fetchWeatherFunc = async (storageCity: string): Promise<void> => {
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
            const data: WeatherDataType | null = await fetchWeather(
                queryCity,
                API_KEY
            );

            if (data?.cod !== 404) {
                setWeatherData(data);
                localStorage.setItem(key, JSON.stringify({ data, timestamp: nowTime }));

                localStorage.setItem("city", JSON.stringify(queryCity || ""));

                setCity("");
            } else {
                setError(data?.message || "Помилка запиту");
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <section className="flex flex-col px-4 mt-10 mb-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative ">
            <Header fetchWeatherFunc={fetchWeatherFunc} />
            <Hero weatherData={weatherData} />

            {error && (
                <div className="mt-[150px] text-[50px] font-normal text-gray-500 mx-auto">
                    {error.charAt(0).toUpperCase() + error.slice(1)}
                </div>
            )}
            <WeatherDescription weatherData={weatherData} />
            <Footer />
        </section>
    );
};

export default HomePage;
