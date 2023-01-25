import ProductManager from "./logic/ProductManager";
const ManagerProduct = new ProductManager("products");

export default (io) => {
  io.on("connection", (socket) => {
    RenderProducts(socket);
    SaveProduct(socket);
    DeleteProduct(socket);
  });
};

const RenderProducts = async (socket) => {
  await ManagerProduct.getProducts();
  const products = ManagerProduct.products;
  socket.on("client:FetchProduct", () => {
    socket.emit("backend:RenderProducts", products);
  });
};

const SaveProduct = (socket) => {
  socket.on("client:product", (data) => {
    ManagerProduct.addProduct(data);
    socket.emit("backend:SaveProduct", data);
  });
};
const DeleteProduct = (socket) => {
  socket.on("client:clearproduct", async (id) => {
    await ManagerProduct.DeleteProduct(id);
    /* socket.emit("backend:updatelist", ManagerProduct.products); */
  });
};
