const express = require("express");
const app = express();
const cors = require("cors");
const port = 3004;
const userRouter = require("./src/router/user.router");
const recipeRouter = require("./src/router/recipe.router");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
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