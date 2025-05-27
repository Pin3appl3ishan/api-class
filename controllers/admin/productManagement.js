const Product = require('../../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, categoryId, sellerId } = req.body;

    console.log(req.body);

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

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('categoryId', 'productName').populate('sellerId', '');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: 'Product retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, productPrice, productDescription, categoryId, sellerId } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      productName,
      productPrice,
      productDescription,
      categoryId,
      sellerId
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}