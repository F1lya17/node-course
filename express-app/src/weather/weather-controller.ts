import axios from "axios";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base-controller.js";
import type { ILoggerService } from "../logger/logger.service.js";
import { printWeather } from "./print-weather.js";
import { FILE_TYPES } from "../file-types.js";
import type { ExpressReturnType } from "../common/route.interface.js";
import type { WeatherChangeTownDto } from "./dto/weather-change-town.dto.js";
import type { WeatherResponse } from "./weather-controller.interface.js";

const TOKEN = "c393a1ec92b2ff26bf8716986c9932da";
let globalTown = "ufa";

@injectable()
export class WeatherController extends BaseController {
  constructor(@inject(FILE_TYPES.ILogger) loggerService: ILoggerService) {
    super(loggerService);
    this.bindRoutes([
      { path: "/change-town", func: this.changeTown, method: "post" },
      { path: "/", func: this.getWeather, method: "get" },
      { path: "/:town", func: this.getWeather, method: "get" },
    ]);
  }

  changeTown(req: Request<{}, {}, WeatherChangeTownDto>, res: Response): ExpressReturnType | void {
    const { town } = req.body;

    if (!town || typeof town !== "string" || town.trim() === "") {
      return res.status(400).send('Поле "town" обязательно и должно быть непустой строкой');
    }

    globalTown = town.trim();
    this.ok(res, "Город изменен");
  }

  async getWeather(req: Request, res: Response): Promise<void> {
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
