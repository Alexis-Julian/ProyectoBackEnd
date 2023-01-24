import { app as RouteProduct } from "./routes/api/products";
import { app as RouteCart } from "./routes/api/carts";
import { app as RouteView } from "./routes/views/views.router";
import express from "express";
import path from "path";
import morgan from "morgan";

export default (app) => {
  app.use(morgan("dev"));
  app.use(RouteCart);
  app.use(RouteProduct);
  app.use(RouteView);
  app.use(express.static(path.join(__dirname, "public")));
};
