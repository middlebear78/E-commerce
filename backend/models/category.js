const mongoose = require("mongoose");
const { Schema, Type } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true, //for white spaces before or after
      required: "Category name is required",
      minlength: [3, "Too short "],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
