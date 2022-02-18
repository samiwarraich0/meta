const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.getProductById =  async (id) => {
 try {
   
 
  const product = await Product.findById(id);

  if (!product) {
    return new ErrorHandler("Product not found", 404);
  }

  return {
    success: true,
    product,
  };
} catch (error) {
  return new ErrorHandler("Something went wrong.", 500);
}
};
