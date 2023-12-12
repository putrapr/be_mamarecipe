import express from "express";
import helmet from "helmet";
const app = express();
import cors from "cors";
const port = 3004;
import userRouter from "./src/router/user.router.js";
import recipeRouter from "./src/router/recipe.router.js";

import body from "body-parser";
app.use(body.json());
app.use(helmet());
app.use(cors());
app.use(express.static("public/img_users"));
app.use(userRouter);
app.use(recipeRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});