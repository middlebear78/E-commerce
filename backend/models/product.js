const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true, // for white spaces before or after
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2048,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: "category",
    // },
    // subcategories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "subCategory",
    //   },
    // ],
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    // images: {
    //   type: Array,
    // },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String, // Corrected from `string` to `String`
      enum: ["black", "white", "silver", "blue", "brown"],
    },
    brand: {
      type: String,
      enum: ["Samsung", "Lenovo", "Apple", "Microsoft", "Nvidia"],
    },
    // rating: [
    //   {
    //     star: Number,
    //     postedBy: { type: Schema.Types.ObjectId, ref: "user" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
