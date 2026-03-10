import { Container } from "inversify";
import { App } from "./app.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import { type ILoggerService, LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users-controller.js";
import { WeatherController } from "./weather/weather-controller.js";
import { FILE_TYPES } from "./file-types.js";

async function bootstrap() {
  // const logger = new LoggerService();
  // const app = new App(
  //   new UsersController(logger),
  //   new WeatherController(logger),
  //   new ExceptionFilter(logger),
  //   logger,
  // );
  // await app.init();
}

const appContainer = new Container();
appContainer.bind<ILoggerService>(FILE_TYPES.ILogger).to(LoggerService);
appContainer.bind<UsersController>(FILE_TYPES.UsersController).to(UsersController);
appContainer.bind<WeatherController>(FILE_TYPES.WeatherController).to(WeatherController);
appContainer.bind<ExceptionFilter>(FILE_TYPES.IExceptionFilter).to(ExceptionFilter);
appContainer.bind<App>(FILE_TYPES.Application).to(App);
const app = appContainer.get<App>(FILE_TYPES.Application);
app.init();

export { app, appContainer };
