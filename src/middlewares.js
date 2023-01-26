import { app as RouteProduct } from "./routes/api/products.js";
import { app as RouteCart } from "./routes/api/carts.js";
import { app as RouteView } from "./routes/views/views.router.js";
import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import morgan from "morgan";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  app.use(morgan("dev"));
  app.use(RouteCart);
  app.use(RouteProduct);
  app.use(RouteView);
  app.use(express.static(path.join(__dirname, "public")));
};
