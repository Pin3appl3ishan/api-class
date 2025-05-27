const Product = require('../../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, categoryId, sellerId } = req.body;

    const newProduct = new Product({
      productName,
      productPrice,
      productDescription,
      categoryId,
      sellerId
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'productName').populate('sellerId', '');
    return res.status(200).json({
      success: true,
      data: products,
      message: 'All products retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}