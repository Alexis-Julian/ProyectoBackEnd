/* Modules import */
import app from "./app.js";
import handlebars from "express-handlebars";
import http from "http";
import { Server as ServerWebSocket } from "socket.io";
import socket from "./socket.js";
import middlewares from "./middlewares.js";
import config from "./config.js";

/* Initialization  Http Server*/
const httpServer = http.createServer(app);

/* Socket */
const io = new ServerWebSocket(httpServer);
socket(io);

/* Engine Template */
app.engine("handlebars", handlebars.engine());

/* Middlewares */
middlewares(app);

/* Config Server */
config(app);

httpServer.listen(8080);
console.log("Server is running on port 8080");
