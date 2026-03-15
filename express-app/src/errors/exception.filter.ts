import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import type { ILoggerService } from "../logger/logger.service.js";
import type { IExceptionFilter } from "./exception.filter.interface.js";
import { HTTPError } from "./http-error.class.js";
import { FILE_TYPES } from "../file-types.js";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(FILE_TYPES.ILogger) private loggerService: ILoggerService) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    const isHttpError = err instanceof HTTPError;
    const status = isHttpError ? err.statusCode : 500;
    if (isHttpError) {
      this.loggerService.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
    }
    res.status(status).send(err.message);
  }
}
