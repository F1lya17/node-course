import type { NextFunction, Request, Response, Router } from "express";

export interface IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>;
}
