const express = require("express");
const Manager = require("../../logic/CartManager");
const ManagerP = require("../../logic/ProductManager");
const CartManager = new Manager("cart");
const ProductManager = new ManagerP("products");
export const app = express.Router();
app.use(express.json());
/* Methods POST */
app.post("/cart", async (req, res) => {
  const [completed, id] = await CartManager.createCart();
  if (completed) {
    return res.send("The cart has been added successfully, id is " + id);
  }
  res.status(404).send("The cart has not been added successfully");
});
app.post("/cart/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    [parseInt(cid), parseInt(pid)].forEach((e) => {
      if (!Number.isInteger(e)) {
        throw new Error("Parameters must be a number");
      }
    });
    const AllGood = [
      await CartManager.searchCart(cid),
      await ProductManager.getProductById(pid),
    ];
    if (AllGood[0] && AllGood[1]) {
      const completed = CartManager.writeCart(AllGood);
      completed
        ? res.send("Product added successfully")
        : res.status(404).send("Error");
    } else {
      res.send("Some of the two parameters are not correct");
    }
  } catch {
    res.send("Parameters must be a number");
  }
});
/* Methods  GET */
app.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await CartManager.searchCart(cid);
  cart ? res.send(cart.product) : res.send("Cart not found");
});
