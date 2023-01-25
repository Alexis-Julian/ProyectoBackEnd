import { HandleSubmit } from "./ui.js";
import { FetchProduct, DeleteProduct } from "./socket.js";
/* Formulario para ingresar productos */
const productForm = document.getElementById("SendProductForm");
productForm.addEventListener("submit", HandleSubmit);

/* Eliminar producto */

export const btnDelete = (li) => {
  let btndelete = li.querySelector(".delete");
  btndelete.addEventListener("click", () => {
    DeleteProduct(btndelete.dataset.id);
    li.remove();
  });
};

/* Listado de productos agregrados */
const listproduct = document.getElementById("listProducts");
FetchProduct(listproduct);
