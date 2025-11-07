import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeatherDataType, WeatherState } from "../shared/interfaces";
import { changeBackground } from "../shared/changeBackground";

const cacheTime = 10 * 60 * 1000;
const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      weatherData: {},
      lastCity: "",
      currentWeather: null,
      error: "",
      loading: false,

      fetchWeather: async (city: string) => {
        if (!city) return;
        const key = `weather_${city?.toLowerCase()}`;
        const cached = get().weatherData[key];
        const nowTime = Date.now();

        set({ loading: true, error: "", currentWeather: null });
        // if (cached) {
        //   set({
        //     lastCity: city,
        //     currentWeather: cached.data,
        //     loading: false,
        //     error: "",
        //   });
        //   changeBackground(cached.data);
        //   return;
        // }

        if (cached && nowTime - cached.timestamp < cacheTime) {
          set({
            lastCity: city,
            currentWeather: cached.data,
            loading: false,
            error: "",
          });
          changeBackground(cached.data);
          return;
        }
        set({ loading: true, error: "" });
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=uk`
          );

          if (!res.ok) {
            throw new Error("Місто не знайдено");
          }
          const data: WeatherDataType = await res.json();

          set((state) => ({
            weatherData: {
              ...state.weatherData,
              [key]: { data, timestamp: nowTime },
            },
            lastCity: city,
            currentWeather: data,
            loading: false,
            error: "",
          }));
          changeBackground(data);
        } catch (error: any) {

          set({
            error: error.message,
            loading: false,
            currentWeather: null,
            lastCity: "",
          });
        }
      },
    }),
    { name: "weather-storage" }
  )
);
