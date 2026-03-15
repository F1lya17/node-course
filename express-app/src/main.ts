import { Container, ContainerModule } from "inversify";
import { App } from "./app.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import { type ILoggerService, LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users-controller.js";
import { WeatherController } from "./weather/weather-controller.js";
import { FILE_TYPES } from "./file-types.js";
import type { IUsersController } from "./users/user-controller.interface.js";
import type { IUsersService } from "./users/users-service.interface.js";
import { UsersService } from "./users/users-service.js";

type BootstrapReturn = { app: App; appContainer: Container };

export const appBindings = new ContainerModule((bind) => {
  bind.bind<ILoggerService>(FILE_TYPES.ILogger).to(LoggerService);
  bind.bind<IUsersController>(FILE_TYPES.UsersController).to(UsersController);
  bind.bind<IUsersService>(FILE_TYPES.UsersService).to(UsersService);
  bind.bind<WeatherController>(FILE_TYPES.WeatherController).to(WeatherController);
  bind.bind<ExceptionFilter>(FILE_TYPES.IExceptionFilter).to(ExceptionFilter);
  bind.bind<App>(FILE_TYPES.Application).to(App);
});

function bootstrap(): BootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(FILE_TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
