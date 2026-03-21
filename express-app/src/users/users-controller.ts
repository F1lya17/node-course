import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base-controller.js";
import type { ILoggerService } from "../logger/logger.service.js";
import { HTTPError } from "../errors/http-error.class.js";
import { FILE_TYPES } from "../file-types.js";
import type { IUsersController } from "./user-controller.interface.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import type { IUsersService } from "./users-service.interface.js";
import { ValidateMiddleware } from "../common/validate.middleware.js";

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(FILE_TYPES.ILogger) loggerService: ILoggerService,
    @inject(FILE_TYPES.UsersService) private userService: IUsersService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/registry",
        func: this.registry,
        method: "post",
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: "/login",
        func: this.login,
        method: "post",
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
    ]);
  }

  async registry(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      next(new HTTPError(400, "User already exists", "registry"));
    } else {
      this.ok(res, result);
    }
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const isUser = await this.userService.validateUser(req.body);
    if (isUser) {
      this.ok(res, "Все верно, пользователь авторизован");
    } else {
      next(new HTTPError(401, "Неправильная почта или пароль", "login"));
    }
  }
}
