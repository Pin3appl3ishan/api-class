const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new Category({ categoryName });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json({
      success: true,
      data: categories,
      message: "All category",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    return res.json({ success: true, data: category, message: "One category" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    return res.json({ success: true, data: category, message: "Updated" });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    return res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
