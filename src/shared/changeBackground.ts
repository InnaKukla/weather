import { WeatherDataType } from "./interfaces";

const bgType: Record<string, string> = {
  Clouds: `${process.env.PUBLIC_URL}/images/cloudy2.jpg`,
  Rain: `${process.env.PUBLIC_URL}/images/rain.webp`,
  Clear: `${process.env.PUBLIC_URL}/images/clear.jpg`,
  Snow: `${process.env.PUBLIC_URL}/images/snow.jpg`,
  Default: `${process.env.PUBLIC_URL}/images/default.png`,
};

export const changeBackground = (weatherData: WeatherDataType | null) => {
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
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  };
  return img;
};
