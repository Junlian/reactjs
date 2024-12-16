import Product from '../models/Product.js';
import { createError } from '../utils/error.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .populate({
        path: 'store',
        select: 'name rating deliveryTime',
        model: 'Store'
      })
      .sort({ createdAt: -1 });

    console.log('Products found:', products.length); // Debug log

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    next(createError(500, 'Error fetching products'));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'store',
        select: 'name rating deliveryTime',
        model: 'Store'
      });
    
    if (!product) {
      return next(createError(404, 'Product not found'));
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    next(createError(500, 'Error fetching product'));
  }
}; 