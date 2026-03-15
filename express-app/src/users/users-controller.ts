import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base-controller.js";
import type { ILoggerService } from "../logger/logger.service.js";
import { HTTPError } from "../errors/http-error.class.js";
import { FILE_TYPES } from "../file-types.js";
import type { IUsersController } from "./user-controller.interface.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import type { IUsersService } from "./users-service.interface.js";

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(FILE_TYPES.ILogger) loggerService: ILoggerService,
    @inject(FILE_TYPES.UsersService) private userService: IUsersService,
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: "/registry", func: this.registry, method: "post" },
      { path: "/login", func: this.login, method: "post" },
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

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    next(new HTTPError(401, "Not authorized", "login"));
    // this.ok(res, "Got a POST request at /users/login");
  }
}
