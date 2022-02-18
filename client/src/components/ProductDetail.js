import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const productId = match.params.id;

  const getProductById = async () => {
    const { data } = await axios.get(`/api/product/${productId}`);
    setProduct(data?.product);
  };

  useEffect(() => {
    if (productId !== product._id) getProductById();
  }, [productId]);

  return (
    <div
      style={{
        margin: 60,
        backgroundColor: "red",
        borderRadius: 20,
        padding: 10,
      }}
    >
      <img src={product.image} style={{ height: "50%", width: "100%" }} />
      <h5>{product.title}</h5>
      <h5>Category: {product.category}</h5>
      <h5>Description: {product.description}</h5>
      <h5>Price: {product.price} $</h5>
    </div>
  );
};

export default ProductDetail;
