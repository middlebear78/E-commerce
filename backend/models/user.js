const mongoose = require("mongoose");
const { Schema, Type } = mongoose


const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, index: true },
    role: { type: String, default: "subscriber" },
    cart: { type: Array, default: [] },
    address: String,
    //   wishlist: [{ type: ObjectId, ref: "product" }], - use Types.ObjectId
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
