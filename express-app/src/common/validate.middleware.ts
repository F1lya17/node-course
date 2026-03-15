import type { NextFunction, Request, Response, Router } from "express";
import type { IMiddleware } from "./middleware.interface.js";
import { plainToClass, type ClassConstructor } from "class-transformer";
import { validate } from "class-validator";

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute(req: Request, res: Response, next: NextFunction) {
    const instance = plainToClass(this.classToValidate, req.body);
    validate(instance).then((errors) => {
      if (errors.length) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
