import type { NextFunction, Request, Response } from "express";

export interface IUsersController {
  registry(req: Request, res: Response, next: NextFunction): void;
  login(req: Request, res: Response, next: NextFunction): void;
}
