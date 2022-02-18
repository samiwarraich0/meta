const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newProduct = catchAsyncErrors( async (req, res, next) => {
 
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      product,
    });
});

exports.getProducts = catchAsyncErrors( async (req, res, next) => {
 
    const product = await Product.find();

    res.status(201).json({
      success: true,
      product,
    });
});

exports.getProductById = catchAsyncErrors( async (req, res, next) => {
 
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
});
