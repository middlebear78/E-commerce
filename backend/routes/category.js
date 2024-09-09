const express = require("express");

const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", authCheck, adminCheck, list);
router.get("/category/:slug", authCheck, adminCheck, read);

router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
