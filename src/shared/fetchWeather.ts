export interface WeatherDataType {
  cod?: number;
  name: string;
  message?: string;
  weather: [{ description: string, main: string }];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number; deg: number; gust?: number };
  sys?: { sunrise?: number; sunset?: number };
  visibility: number;
  [key: string]: any;
}
export const fetchWeather = async (
  queryCity: string,
  API_KEY: string
): Promise<WeatherDataType | null> => {
  console.log(queryCity);

  console.log(API_KEY);

  // const queryCity = storageCity || city;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${API_KEY}&units=metric&lang=uk`
    );
    if (!res.ok) {
      throw new Error("Упс, ось пішло не так");
    }
    const data: WeatherDataType = await res.json();
    return data;
  } catch (error) {
    console.error("Ой, погода в цому місці не знайдена");
    return null;
  }
};
