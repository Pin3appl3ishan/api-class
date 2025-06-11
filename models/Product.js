const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  productImage: {
    type: String,
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
