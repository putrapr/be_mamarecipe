import express from "express";
const router = express.Router();
import recipeController from "../controller/recipe.controller.js";
const { selectAll, getById, search, destroy, insert, update } = recipeController;
import upload from "../middleware/upload.js";

router
  .get("/recipe-getAll", selectAll)
  .get("/recipe-getById/:id", getById)
  .get("/recipe-search/:keyword", search)
  // .get("/recipe-pagination")
  .post("/recipe-insert", upload, insert)
  .put("/recipe-update/:id", upload, update)
  .delete("/recipe-hapus/:id", destroy);

export default router;