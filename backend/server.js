const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
fs.readdirSync("./routes").forEach((route) => {
  app.use("/api", require("./routes/" + route));
});

// db
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE);
      console.log("DB Connected");
    } catch (err) {
      console.error("DB Connection Error:", err);
      process.exit(1);
    }
  };

// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Execute the async database connection function
connectDB();
