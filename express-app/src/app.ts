import express, { type Express, type Router } from "express";
import { Server } from "http";

type RoutesArray = { path: string; router: Router }[];

export class App {
  app: Express;
  port: number;
  routes: RoutesArray;
  server: Server;

  constructor(routes: RoutesArray, port: number = 3000) {
    this.app = express();
    this.port = port;
    this.routes = routes;
  }

  useRoutes(route: { path: string; router: Router }) {
    this.app.use(route.path, route.router);
  }

  init() {
    this.routes.forEach((route) => this.useRoutes(route));
    this.server = this.app.listen(this.port, () => console.log(`listening on port ${this.port}`));
  }
}
