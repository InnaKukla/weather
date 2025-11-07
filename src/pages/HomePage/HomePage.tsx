import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import WeatherDescription from "../../components/WeatherDescription/WeatherDescription";
import Footer from "../../components/Footer/Footer";
import { useWeatherStore } from "../../zustand/useWeatherStore";
import Loader from "../../shared/Loader/Loader";
import { changeBackground } from "../../shared/changeBackground";

const HomePage = () => {
    const { fetchWeather, lastCity, currentWeather, error, loading } =
        useWeatherStore();

    useEffect(() => {
        if (!currentWeather) {
            changeBackground(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error) {
            changeBackground(null);
        }
    }, [error]);

    useEffect(() => {
        if (lastCity) fetchWeather(lastCity);
    }, [fetchWeather, lastCity]);

    const fetchWeatherFunc = async (city: string): Promise<void> => {
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <section className="flex min-h-screen flex-col px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative ">
            <Header fetchWeatherFunc={fetchWeatherFunc} />
            {loading && <Loader />}
            {error && (
                <div className="mt-[150px] text-[50px] font-normal text-[#383c45] mx-auto">
                    {error.charAt(0).toUpperCase() + error.slice(1)}
                </div>
            )}
            {currentWeather && !error && !loading && (
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
