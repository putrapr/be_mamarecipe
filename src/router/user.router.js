/* eslint-disable no-unused-vars */
import express from "express";
const router = express.Router();
import userController from "../controller/user.controller.js";
const { selectAll, destroy, register, login, update, updateImage, getByIdRedis, getById } = userController;
import upload from "../middleware/upload.js";
// import auth from "../middleware/auth.js";
// const { isAdmin, isCostumer } = auth;
import staticAuth from "../middleware/staticAuth.js";
import hitById from "../middleware/hitByRedis.js";

router
  .get("/getFromRedis/:id", hitById, getByIdRedis)
  .get("/user-all", selectAll)
  // .get("/user-level", staticAuth, isAdmin, selectAll)
  .get("/user-getById/:id", getById)
  .post("/user-register", upload, register)  
  .post("/user-login", login)
  .delete("/user-delete/:id", destroy)
  .put("/user-update/:id", update)
  .put("/user-updateImage/:id", upload, updateImage);

export default router;