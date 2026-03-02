import express from "express";
import { App } from "./app.js";
import { weatherRouter } from "./weather/weather.js";
import { userRouter } from "./users/users.js";

async function bootstrap() {
  const app = new App([
    { path: "/users", router: userRouter },
    { path: "/weather", router: weatherRouter },
  ]);

  await app.init();
}

bootstrap();
