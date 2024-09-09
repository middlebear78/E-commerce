const express = require("express");

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const data = "hi this the user API endpoint";
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
