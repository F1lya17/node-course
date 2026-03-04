import axios from "axios";
import type { Request, Response } from "express";
import { BaseController } from "../common/base-controller.js";
import type { LoggerService } from "../logger/logger.service.js";
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

const TOKEN = "c393a1ec92b2ff26bf8716986c9932da";
let globalTown = "ufa";

export class WeatherController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/change-town", func: this.changeTown, method: "post" },
      { path: "/", func: this.getWeather, method: "get" },
      { path: "/:town", func: this.getWeather, method: "get" },
    ]);
  }

  changeTown(req: Request, res: Response) {
    const { town } = req.body;

    if (!town || typeof town !== "string" || town.trim() === "") {
      return res.status(400).send('Поле "town" обязательно и должно быть непустой строкой');
    }

    globalTown = town.trim();
    this.ok(res, "Город изменен");
  }

  async getWeather(req: Request, res: Response) {
    try {
      const town = req.params.town || globalTown;

      const { data }: { data: WeatherResponse } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: town,
            appid: TOKEN,
            lang: "ru",
            units: "metric",
          },
        },
      );

      const weatherHtml = printWeather(data);
      this.ok(res, weatherHtml);
    } catch (error) {
      this.logger.error(`Ошибка при получении погоды: ${error}`);
      res.status(500).send("Ошибка при получении данных о погоде");
    }
  }
}
