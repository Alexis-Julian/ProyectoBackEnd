import express from "express";
import Manager from "../../logic/ProductManager.js";
export const app = express.Router();
const ProManager = new Manager("products");

app.get("/", async (req, res) => {
  await ProManager.getProducts();
  let products = ProManager.products.map((e) => {
    let aux = Object.values(e);
    return aux;
  });
  res.render("home", { products });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    style: "index.css",
  });
});
