import { btnDelete } from "./index.js";
import { SendProduct } from "./socket.js";
export const HandleSubmit = (e) => {
  e.preventDefault();
  let data = {
    title: e.target["title"].value,
    description: e.target["description"].value,
    price: e.target["price"].value,
    stock: e.target["stock"].value,
    code: e.target["code"].value,
    category: e.target["category"].value,
  };
  SendProduct(data);
};

export const RenderProduct = (data, ul) => {
  data.map((ele) => {
    const li = document.createElement("li");
    li.innerHTML += `
          <h3>${ele.title}</h1>
          <p>${ele.description}</p>
          <p>${ele.price}</p>
          <p>${ele.stock}</p>
          <p>${ele.code}</p>
          <p>${ele.category}</p>
          <button class="delete" data-id=${ele.id}>Eliminar</button>
          <button class="update" data-id=${ele.id}>Actualizar</button>
      `;
    li.classList.add("liproduct");
    btnDelete(li);
    ul.appendChild(li);
  });
};
