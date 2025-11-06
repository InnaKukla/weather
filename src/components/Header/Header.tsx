import React, { useState } from 'react'

interface HeaderProps {
    fetchWeatherFunc: (city: string) => void
}

const Header: React.FC<HeaderProps> = ({ fetchWeatherFunc }) => {

    const [city, setCity] = useState("");
    return (
        <header className="flex flex-col sx:flex-row gap-3 items-center justify-around z-100 m-auto">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-black to-[#ffffff85] bg-clip-text text-transparent">
                Weather
            </h1>
            <div className="flex gap-1">
                <input
                    name="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") fetchWeatherFunc(city);
                    }}
                    placeholder="Назва населеного пункту, країни чи регіону"
                    autoComplete="off"
                    className="w-[80vw] ring-1 ring-gray-300 rounded-md md:w-[450px] lg:w-[600px] p-2 outline-gray-300 bg-color-[#fff] text-[#75777a]"
                />
                <button
                    onClick={() => fetchWeatherFunc(city)}
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
    )
}

export default Header
