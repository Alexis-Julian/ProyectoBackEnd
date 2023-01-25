import { RenderProduct } from "./ui.js";
const socket = io();

export const SendProduct = (data) => {
  /* Emite al backend el producto ingresado🔽🔽 */
  socket.emit("client:product", data);
};

export const DeleteProduct = (data) => {
  /* Emite al backend el producto ha borrar */
  socket.emit("client:clearproduct", data);
  /* socket.on("backend:updatelist", (data) => {
    console.log(data);
  }); */
};

export const FetchProduct = (ul) => {
  /* Emite una devolucion de  todos los productos 🔽 🔽 */
  socket.emit("client:FetchProduct");

  /* Esucha la devolucion de todos los products */
  socket.on("backend:RenderProducts", (data) => {
    RenderProduct(data, ul);
  });

  /*Escucha el producto ingresado por el cliente 🔽🔽 */
  socket.on("backend:SaveProduct", (data) => {
    RenderProduct([data], ul);
  });
};
