import { Router, type Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import type { ExpressReturnType, IRouteController } from "./route.interface.js";
import type { ILoggerService } from "../logger/logger.service.js";

injectable();
export abstract class BaseController {
  private readonly _router: Router;
  protected readonly logger;

  constructor(logger: ILoggerService) {
    this.logger = logger;
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send(res, 200, message);
  }

  protected bindRoutes(routes: IRouteController[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}
