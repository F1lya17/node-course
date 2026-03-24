import type { NextFunction, Request, Response, Router } from "express";
import type { IMiddleware } from "./middleware.interface.js";

export interface IRouteController {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "put" | "patch" | "delete">;
  middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
