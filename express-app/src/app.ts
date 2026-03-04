import express, { type Express, type Router } from "express";
import { Server } from "http";
import type { ILoggerService } from "./logger/logger.service.js";
import type { UsersController } from "./users/users-controller.js";
import type { WeatherController } from "./weather/weather-controller.js";
import type { IExceptionFilter } from "./errors/exception.filter.interface.js";

type RoutesArray = { path: string; router: Router }[];

export class App {
  app: Express;
  port: number;
  routes: RoutesArray;
  server: Server;
  logger: ILoggerService;
  userController: UsersController;
  weatherController: WeatherController;
  exceptionFilter: IExceptionFilter;

  constructor(
    userController: UsersController,
    weatherController: WeatherController,
    exceptionFilter: IExceptionFilter,
    logger: ILoggerService,
    port: number = 3000,
  ) {
    this.app = express();
    this.port = port;
    this.logger = logger;
    this.userController = userController;
    this.weatherController = weatherController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
    this.app.use("/weather", this.weatherController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port, () =>
      this.logger.log(`listening on port ${this.port}`),
    );
  }
}
