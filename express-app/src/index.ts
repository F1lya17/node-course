// учебный файл
// import express, { type NextFunction, type Request, type Response } from "express";
// import { userRouter } from "./users/users.js";
// import { weatherRouter } from "./weather/weather.js";

// const port = 3000;
// const app = express();

// app.use(express.json());
// app.use("/users", userRouter);
// app.use("/weather", weatherRouter);

// app.get("/hello", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/error", (req, res) => {
//   throw new Error("error");
// });

// app.use((req, res) => {
//   res.status(404).send("Маршрут не найден");
// });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.log(err.message);
//   res.status(500).send(err.message);
// });

// app.listen(port, () => console.log(`listening on port ${port}`));
