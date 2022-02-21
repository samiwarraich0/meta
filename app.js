const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const errorMiddleware = require("./middlewares/errors");

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
      const response = await fetch(`https://nyac-meta.herokuapp.com/api/product/${splitedUrl[2]}`)
      const {product}=await response.json()

      if (product._id) {
        html = html
          .replace("<title>Products</title>", `<title>${product.title}</title>`)
          .replace(
            '<meta name="title" content="Products" />',
            `<meta name="title" content="${product.title}" />`
          )
          .replace(
            '<meta name="description" content="Products" />',
            `<meta name="description" content="${product.description}" />`
          )
          .replace(
            '<meta property="og:title" content="Products" />',
            `<meta property="og:title" content="${product.title}" />`
          )
          .replace(
            '<meta property="og:description" content="Products" />',
            `<meta property="og:description" content="${product.description}" />`
          )
          .replace(
            '<meta property="og:url" content="https://nyac-meta.herokuapp.com" />',
            `<meta property="og:url" content="https://nyac-meta.herokuapp.com${url}" />`
          )
          .replace(
            `<meta property="og:image" content="https://i.dawn.com/primary/2022/02/6206099d92b6e.png" />`,
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
            '<meta property="twitter:url" content="https://nyac-meta.herokuapp.com" />',
            `<meta property="twitter:url" content="https://nyac-meta.herokuapp.com${url}" />`
          )
          .replace(
            `<meta property="twitter:image" content="https://i.dawn.com/primary/2022/02/6206099d92b6e.png" />`,
            `<meta property="twitter:image" content="${product.image}" />`
          );

        return res.send(html);
      } else {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
      }
    });
  });
}

app.use(errorMiddleware);

module.exports = app;
