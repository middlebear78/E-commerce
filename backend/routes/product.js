const express = require("express");

const router = express.Router();

const { read, create } = require("../controllers/product");
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);

module.exports = router;
