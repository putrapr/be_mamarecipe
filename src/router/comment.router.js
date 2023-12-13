import express from "express";
const router = express.Router();
import commentController from "../controller/comment.controller.js";
const { getByRecipeId, insert, destroy } = commentController;

router
  .get("/comment/:recipe_id", getByRecipeId)
  .post("/comment", insert)
  .delete("/comment/:id", destroy);

export default router;