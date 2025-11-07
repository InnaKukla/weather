import React, { useState } from "react";
import { HeaderProps } from "../../shared/interfaces";

const Header: React.FC<HeaderProps> = ({ fetchWeatherFunc }) => {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (!city) return;
        fetchWeatherFunc(city);
        setCity("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
            (e.target as HTMLElement)?.blur();
        }
    };
    return (
        <header className="flex flex-col sm:flex-row gap-3 items-center justify-between z-100  mt-10 ">
            <a href="/weather">
                <h1 className="text-5xl hover:text-[52px] font-bold bg-gradient-to-r from-black to-[#ffffff85] bg-clip-text text-transparent cursor-pointer">
                    Weather
                </h1>
            </a>
            <div className="flex gap-5">
                <input
                    name="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Назва населеного пункту, країни чи регіону"
                    autoComplete="off"
                    className="w-[300px] ring-1 ring-gray-300 rounded-md sm:w-[450px] lg:w-[600px] p-2 outline-gray-300 bg-color-[#fff] text-[#75777a]"
                />
                <button
                    onClick={handleSearch}
                    disabled={city === ""}
                    className="cursor-pointer"
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/icons/search-white.svg`}
                        alt="search icon"
                        className="color-white"
                        width={24}
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
