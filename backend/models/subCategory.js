const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Sub Category name is required"],
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
    parent_category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
