import express from "express";
const router = express.Router();
import likedController from "../controller/liked.controller.js";
const { getAll } = likedController;

router
  .get("/liked", getAll);

export default router;