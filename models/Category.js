const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

exports.Category = mongoose.model("Product", CategorySchema);
