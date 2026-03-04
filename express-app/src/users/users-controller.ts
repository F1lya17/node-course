import type { Request, Response } from "express";
import { BaseController } from "../common/base-controller.js";
import type { LoggerService } from "../logger/logger.service.js";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/registry", func: this.registry, method: "post" },
      { path: "/login", func: this.login, method: "post" },
    ]);
  }

  registry(req: Request, res: Response) {
    this.ok(res, "Got a POST request at /users/registry");
  }

  login(req: Request, res: Response) {
    this.ok(res, "Got a POST request at /users/login");
  }
}
