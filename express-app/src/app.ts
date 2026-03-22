import express, { type Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import type { ILoggerService } from "./logger/logger.service.js";
import type { UsersController } from "./users/users-controller.js";
import type { WeatherController } from "./weather/weather-controller.js";
import type { IExceptionFilter } from "./errors/exception.filter.interface.js";
import { FILE_TYPES } from "./file-types.js";
import type { PrismaService } from "./database/prisma-service.js";
import { AuthMiddleware } from "./common/auth.middleware.js";
import type { IConfigService } from "./config/config-servive.interface.js";

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(FILE_TYPES.UsersController) private userController: UsersController,
    @inject(FILE_TYPES.WeatherController) private weatherController: WeatherController,
    @inject(FILE_TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(FILE_TYPES.ILogger) private loggerService: ILoggerService,
    @inject(FILE_TYPES.PrismaService) private prismaService: PrismaService,
    @inject(FILE_TYPES.IConfigService) private configService: IConfigService,
    port: number = 3000,
  ) {
    this.app = express();
    this.port = port;
  }

  useMiddleware(): void {
    this.app.use(express.json());
    const authMiddleWare = new AuthMiddleware(this.configService.get("JWT_SECRET"));
    this.app.use(authMiddleWare.execute.bind(authMiddleWare));
  }

  useRoutes(): void {
    this.app.use("/users", this.userController.router);
    this.app.use("/weather", this.weatherController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port, () =>
      this.loggerService.log(`listening on port ${this.port}`),
    );
  }
}
