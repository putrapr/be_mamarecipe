import express from "express";
import helmet from "helmet";
import cors from "cors";
const app = express();
const port = 3004;
import userRouter from "./src/router/user.router.js";
import recipeRouter from "./src/router/recipe.router.js";
import commentRouter from "./src/router/comment.router.js";
import likedRouter from "./src/router/liked.router.js";
import savedRouter from "./src/router/saved.router.js";

import body from "body-parser";
app.use(body.json());
app.use(helmet());
app.use(cors());
app.use(express.static("public/img_users"));
app.use(userRouter);
app.use(recipeRouter);
app.use(commentRouter);
app.use(likedRouter);
app.use(savedRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});