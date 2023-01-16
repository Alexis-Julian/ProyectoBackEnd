const express = require("express");
const morgan = require("morgan");
const RouteProduct = require("./routes/api/products");
const RouteCart = require("./routes/api/carts");
const app = express();

app.use(morgan("dev"));
app.use(RouteCart);
app.use(RouteProduct);

app.listen(8080);
