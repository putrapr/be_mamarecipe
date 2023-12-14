import express from "express";
const router = express.Router();
import likedController from "../controller/liked.controller.js";
const { getAll, getByUserId, isLike, addLike, unLike } = likedController;

router
  .get("/liked", getAll)
  .get("/liked/:user_id", getByUserId)
  .post("/liked-check", isLike)
  .post("/liked", addLike)
  .delete("/liked", unLike);


export default router;