import express, { type Express, type Router } from "express";
import { Server } from "http";
import type { ILoggerService } from "./logger/logger.service.js";
import type { UsersController } from "./users/users-controller.js";
import type { WeatherController } from "./weather/weather-controller.js";

type RoutesArray = { path: string; router: Router }[];

export class App {
  app: Express;
  port: number;
  routes: RoutesArray;
  server: Server;
  logger: ILoggerService;
  userController: UsersController;
  weatherController: WeatherController;

  constructor(
    userController: UsersController,
    weatherController: WeatherController,
    logger: ILoggerService,
    port: number = 3000,
  ) {
    this.app = express();
    this.port = port;
    this.logger = logger;
    this.userController = userController;
    this.weatherController = weatherController;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
    this.app.use("/weather", this.weatherController.router);
  }

  init() {
    this.useRoutes();
    this.server = this.app.listen(this.port, () =>
      this.logger.log(`listening on port ${this.port}`),
    );
  }
}
