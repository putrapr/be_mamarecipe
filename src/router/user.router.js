/* eslint-disable no-unused-vars */
import express from "express";
const router = express.Router();
import userController from "../controller/user.controller.js";
const { getAll, getById, register, login, update, updateImage, destroy } = userController;
import upload from "../middleware/upload.js";
// import { isAdmin, isCostumer } from "../middleware/auth.js";
// import auth from "../middleware/auth.js";
// const { isAdmin, isCostumer } = auth;
// import staticAuth from "../middleware/staticAuth.js";
// import hitById from "../middleware/hitByRedis.js";

router
  .get("/user", getAll)
  .get("/user/:id", getById)
  .post("/user", register)
  .post("/user-login", login)
  .put("/user/:id", update)
  .put("/user-image/:id", upload, updateImage)
  .delete("/user/:id", destroy);


  // .get("/userRedisById/:id", hitById, getByIdRedis)  
  // .get("/user-level", staticAuth, isAdmin, getAll)
  // .post("/user", upload, register)

export default router;