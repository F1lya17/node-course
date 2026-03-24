import type { NextFunction, Request, Response } from "express";

export interface IUsersController {
  registry(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  info(req: Request, res: Response, next: NextFunction): Promise<void>;
}
