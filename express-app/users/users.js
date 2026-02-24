import express from "express";

const userRouter = express.Router();

userRouter.get("/registry", (req, res) => {
  res.send("Got a GET request at /user/registry");
});

userRouter.post("/login", (req, res) => {
  res.send("Got a POST request at /user/login");
});

export { userRouter };
