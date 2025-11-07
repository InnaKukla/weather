export interface WeatherDataType {
  cod?: string;
  name: string;
  message?: string;
  weather: [{ description: string; main: string }];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number; deg: number; gust?: number };
  sys?: { sunrise?: number; sunset?: number };
  visibility: number;
  [key: string]: any;
}

export interface HeaderProps {
  fetchWeatherFunc: (city: string) => void;
}

export interface HeroProps {
  weatherData?: WeatherDataType | null;
  loading: boolean;
  error: string;
}

export interface CachedWeather {
  data: WeatherDataType;
  timestamp: number;
}
export interface WeatherState {
  weatherData: Record<string, CachedWeather>;
  lastCity: string;
  currentWeather: WeatherDataType | null;
  error: string;
  loading: boolean;
  fetchWeather: (city: string) => Promise<void>;
}

export interface WeatherDataProps {
  weatherData: WeatherDataType | null;
}
