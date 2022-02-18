const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { getProductById } = require("./services/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const product = require("./routes/product");

app.use("/api", product);

if (process.env.NODE_ENV === "PRODUCTION") {
  const indexPath = path.resolve(__dirname, "./client/build/index.html");
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    fs.readFile(indexPath, "utf8", async (error, html) => {
      if (error) console.log(error);
      const url = req.url;
      splitedUrl = url.split("/");
      const { product } = await getProductById(splitedUrl[2]);
      if (product._id) {
        html = html
          .replace("<title>Products</title>", `<title>${product.title}</title>`)
          .replace(
            '<meta property="og:title" content="Products" />',
            `<meta property="og:title" content="${product.title}" />`
          )
          .replace(
            '<meta property="og:description" content="Products" />',
            `<meta property="og:description" content="${product.description}" />`
          )
          .replace(
            '<meta property="og:image" content="https://softwaremathematics.com/wp-content/uploads/2021/02/ultimate-guide-to-your-product-launch.jpg" />',
            `<meta property="og:image" content="${product.image}" />`
          )
          .replace(
            '<meta property="twitter:title" content="Products" />',
            `<meta property="twitter:title" content="${product.title}" />`
          )
          .replace(
            '<meta property="twitter:description" content="Products" />',
            `<meta property="twitter:description" content="${product.description}" />`
          )
          .replace(
            '<meta property="twitter:image" content="https://softwaremathematics.com/wp-content/uploads/2021/02/ultimate-guide-to-your-product-launch.jpg" />',
            `<meta property="twitter:image" content="${product.image}" />`
          );

        return res.send(html);
      } else {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
      }
    });
  });
}

module.exports = app;
