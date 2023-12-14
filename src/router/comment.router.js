import express from "express";
const router = express.Router();
import commentController from "../controller/comment.controller.js";
const { getByRecipeId, insert, destroy, pagination } = commentController;

router
  .get("/comment/:recipe_id", getByRecipeId)
  .get("/comment-pagination/:recipe_id", pagination)
  .post("/comment", insert)
  .delete("/comment/:id", destroy);

export default router;