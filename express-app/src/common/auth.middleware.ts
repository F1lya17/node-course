import jwt from "jsonwebtoken";
import type { IMiddleware } from "./middleware.interface.js";
import type { NextFunction, Request, Response, Router } from "express";

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly secret: string) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const [, jwtToken] = req.headers.authorization.split(" ");
        if (jwtToken) {
          const payload = await this.verifyJWT(jwtToken, this.secret);
          req.user = payload.email;
          next();
        } else {
          next();
        }
      } catch (e) {
        next();
      }
    } else {
      next();
    }
  }

  private async verifyJWT(jwtToken: string, secret: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(jwtToken, secret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload as jwt.JwtPayload);
      });
    });
  }
}
