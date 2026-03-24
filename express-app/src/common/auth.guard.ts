import type { NextFunction, Request, Response, Router } from "express";
import type { IMiddleware } from "./middleware.interface.js";

export class AuthGuard implements IMiddleware {
  async execute(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      next();
    } else {
      res.status(401).send({ error: "Вы не авторизованы" });
    }
  }
}
