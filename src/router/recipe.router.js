const express = require("express");
const router = express.Router();
const {selectAll, getById, search, destroy, insert, update} = require("../controller/recipe.controller");
const upload = require("../middleware/upload");

router
  .get("/recipe-getAll", selectAll)
  .get("/recipe-getById/:id", getById)
  .get("/recipe-search/:keyword", search)
  .post("/recipe-insert", upload, insert)
  .put("/recipe-update/:id", upload, update)
  .delete("/recipe-hapus/:id", destroy);

module.exports = router;