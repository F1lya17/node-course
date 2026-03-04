import { Router, type Response } from "express";
import type { IRouteController } from "./route.interface.js";
import type { LoggerService } from "../logger/logger.service.js";

export abstract class BaseController {
  private readonly _router: Router;
  protected readonly logger;

  constructor(logger: LoggerService) {
    this.logger = logger;
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send(res, 200, message);
  }

  protected bindRoutes(routes: IRouteController[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}
