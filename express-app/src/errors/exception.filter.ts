import type { NextFunction, Request, Response } from "express";
import type { LoggerService } from "../logger/logger.service.js";
import type { IExceptionFilter } from "./exception.filter.interface.js";
import { HTTPError } from "./http-error.class.js";

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    const isHttpError = err instanceof HTTPError;
    const status = isHttpError ? err.statusCode : 500;
    if (isHttpError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
    }
    res.status(status).send(err.message);
  }
}
