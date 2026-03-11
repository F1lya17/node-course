import { Container, ContainerModule } from "inversify";
import { App } from "./app.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import { type ILoggerService, LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users-controller.js";
import { WeatherController } from "./weather/weather-controller.js";
import { FILE_TYPES } from "./file-types.js";

export const appBindings = new ContainerModule((bind) => {
  bind.bind<ILoggerService>(FILE_TYPES.ILogger).to(LoggerService);
  bind.bind<UsersController>(FILE_TYPES.UsersController).to(UsersController);
  bind.bind<WeatherController>(FILE_TYPES.WeatherController).to(WeatherController);
  bind.bind<ExceptionFilter>(FILE_TYPES.IExceptionFilter).to(ExceptionFilter);
  bind.bind<App>(FILE_TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(FILE_TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
