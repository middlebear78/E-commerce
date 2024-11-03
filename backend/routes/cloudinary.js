const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");

const { upload, remove } = require("../controllers/cloudinary");

router.post("/upload_images", authCheck, adminCheck, upload);
router.post("/remove_image", authCheck, adminCheck, remove);

module.exports = router;

