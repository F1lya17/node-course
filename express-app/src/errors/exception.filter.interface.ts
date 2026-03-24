import type { NextFunction, Request, Response } from "express";
import type { HTTPError } from "./http-error.class.js";

export interface IExceptionFilter {
  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void;
}
