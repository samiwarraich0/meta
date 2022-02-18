import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await axios.get(`/api/products`);
    setProducts(data?.product);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 20,
        }}
      >
        {products?.map((product) => {
          return (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                style={{
                  margin: 15,
                  height: 500,
                  width: 400,
                  backgroundColor: "red",
                  borderRadius: 10,
                  padding: 5,
                  cursor: "pointer",
                }}
              >
                <img src={product.image} style={{ height: 300, width: 400 }} />
                <h5>{product.title}</h5>
                <h5>Category: {product.category}</h5>
                <h5>Price: {product.price} $</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
