const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
