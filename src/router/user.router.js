const express = require("express");
const router = express.Router();
const {selectAll, destroy, register, login, update, updateImage, getByIdRedis, getById} = require("../controller/user.controller");
const upload = require("../middleware/upload");
const {isAdmin, isCostumer} = require("../middleware/auth");
const staticAuth = require("../middleware/staticAuth");
const hitById = require("../middleware/hitByRedis");

router
  .get("/getFromRedis/:id", hitById, getByIdRedis)
  .get("/user-all", selectAll)
  .get("/user-level", staticAuth, isAdmin, selectAll)
  .get("/user-getById/:id", getById)
  .post("/user-register", upload, register)  
  .post("/user-login", login)
  .delete("/user-delete/:id", destroy)
  .put("/user-update/:id", update)
  .put("/user-updateImage/:id", upload, updateImage);

module.exports = router;