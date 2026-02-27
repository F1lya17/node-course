import axios from "axios";
import express from "express";
import { printWeather } from "./print-weather.js";

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const token = "c393a1ec92b2ff26bf8716986c9932da";
let globalTown = "ufa";
const weatherRouter = express.Router();

weatherRouter
  .post("/change-town", (req, res) => {
    const { town } = req.body;

    if (!town || typeof town !== "string" || town.trim() === "") {
      return res.status(400).send('Поле "town" обязательно и должно быть непустой строкой');
    }

    globalTown = town.trim();
    res.send("Город изменен");
  })
  .use(async (req, res, next) => {
    try {
      const { data }: { data: WeatherResponse } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: req.url.slice(1) || globalTown,
            appid: token,
            lang: "ru",
            units: "metric",
          },
        },
      );

      res.send(printWeather(data));
    } catch (error) {
      next(error);
    }
  });

export { weatherRouter };
