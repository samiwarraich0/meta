const Product = require("../models/product");

exports.getProductById = async (id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return console.log("Product not found");
    }

    return {
      success: true,
      product,
    };
  } catch (error) {
    console.log(error);
  }
};
