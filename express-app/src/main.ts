import { App } from "./app.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users-controller.js";
import { WeatherController } from "./weather/weather-controller.js";

async function bootstrap() {
  const logger = new LoggerService();
  const app = new App(
    new UsersController(logger),
    new WeatherController(logger),
    new ExceptionFilter(logger),
    logger,
  );

  await app.init();
}

bootstrap();
