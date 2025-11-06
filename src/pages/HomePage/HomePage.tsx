import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import WeatherDescription from "../../components/WeatherDescription/WeatherDescription";
import Footer from "../../components/Footer/Footer";
import { useWeatherStore } from "../../zustand/useWeatherStore";
import Loader from "../../shared/Loader/Loader";

const HomePage = () => {
    // const [city, setCity] = useState("");
    const { fetchWeather, lastCity, currentWeather, error, loading } =
        useWeatherStore();


    useEffect(() => {
        if (lastCity) {
            fetchWeather(lastCity);
        }
    }, [fetchWeather, lastCity]);

    const fetchWeatherFunc = async (city: string): Promise<void> => {
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <section className="flex flex-col px-4 mt-10 mb-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative ">
            <Header fetchWeatherFunc={fetchWeatherFunc} />

            {error ? (
                <div className="mt-[150px] text-[50px] font-normal text-gray-500 mx-auto">
                    {error.charAt(0).toUpperCase() + error.slice(1)}
                </div>
            ) : loading ? (
                <div className="mt-[150px] text-[50px] font-normal text-gray-500 mx-auto">
                    <Loader />
                </div>
            ) : (
                <>
                    <Hero weatherData={currentWeather} loading={loading} error={error} />
                    <WeatherDescription weatherData={currentWeather} />
                </>
            )}

            <Footer />
        </section>
    );
};

export default HomePage;
