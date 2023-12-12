import express from "express";
const router = express.Router();
import recipeController from "../controller/recipe.controller.js";
const { getAll, getById, search, pagination, destroy, insert, update } = recipeController;
import upload from "../middleware/upload.js";

router
  .get("/recipe", getAll)
  .get("/recipe/:id", getById)
  .get("/recipe-search", search)
  .get("/recipe-pagination", pagination)
  .post("/recipe", upload, insert)
  .put("/recipe-update/:id", upload, update)
  .delete("/recipe-hapus/:id", destroy);

export default router;