const express = require("express");
const Manager = require("../../logic/ProductManager");
export const app = express.Router();
const ProductManager = new Manager("products");
/* Functions Helpers */
const CallProducts = async () => {
  await ProductManager.getProducts();
};
CallProducts();

/* Methods  GET */
app.get("/product", (req, res) => {
  const { limit } = req.query;
  const products = ProductManager.products;
  if (limit) {
    return res.send(JSON.stringify(products.slice(0, limit)));
  }
  res.send(JSON.stringify(products));
});
app.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  res.send(await ProductManager.getProductById(parseInt(pid)));
});
/* Methods  POST */
app.use(express.json());

app.post("/product", async (req, res) => {
  const productadd = await req.body;
  const response = await ProductManager.addProduct(productadd);
  /*  DataPost(data) */
  response
    ? res.send("Product added successfully!")
    : res.status(404).send("Product failed to be added");
});
/* Methods PUT */
app.put("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  const productupdate = await req.body;
  const correctly = await ProductManager.updateProduct(
    parseInt(pid),
    productupdate
  );
  correctly
    ? res.send("Product updated successfully!")
    : res.status(404).send("Product updated incorrectly!");
});
/* Methods DELETE */
app.delete("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  const removed = await ProductManager.DeleteProduct(pid);
  removed
    ? res.send("Product deleted successfully")
    : res.status(404).send("Product not found!");
});
