import { WeatherDataType } from "./fetchWeather";

const bgType: Record<string, string> = {
  Clouds: "/images/cloudy2.jpg",
  Rain: "/images/rain.webp",
  Clear: "/images/clear.jpg",
  Snow: "/images/snow.jpg",
  Default: "/images/default.png",
};

export const changeBackground = ( weatherData: WeatherDataType ) => {
    console.log(weatherData);
    
     let newBg: string;

    if (weatherData?.weather) {
      newBg = bgType[weatherData?.weather[0]?.main];
    } else {
      newBg = bgType.Default;
    }
    const img = new Image();
    img.src = newBg;

    img.onload = () => {
      document.body.style.transition = "background-image 1s easy-in-out";
      document.body.style.backgroundImage = `url(${newBg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    };
    return img;
};
