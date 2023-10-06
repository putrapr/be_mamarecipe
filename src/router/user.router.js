const express = require("express");
const router = express.Router();
const {selectAll, destroy, register, insert, login, update, getById} = require("../controller/user.controller");
const upload = require("../middleware/upload");
const {isAdmin, isCostumer} = require("../middleware/auth");
const staticAuth = require("../middleware/staticAuth");
const hitById = require("../middleware/hitByRedis");

router
  .get("/getFromRedis/:id", hitById, getById)
  .get("/user-all", selectAll)
  .get("/user-level", staticAuth, isAdmin, selectAll)
  .post("/user-register", upload, register)
  .post("/user-insert", insert)
  .post("/user-login", login)
  .put("/user-ubah/:id", update)
  .delete("/user-hapus/:id", destroy);

module.exports = router;