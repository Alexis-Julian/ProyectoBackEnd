import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default class ProductManager {
  constructor(archive) {
    this.products = [];
    this.path = path.join(__dirname, `../data/${archive}.json`);
  }
  async getProducts() {
    try {
      this.products = await fs.promises
        .readFile(this.path, "utf-8")
        .then((res) => {
          return JSON.parse(res);
        });
    } catch {
      return false;
    }
  }
  async PushProduct(product) {
    await fs.promises.writeFile(this.path, JSON.stringify(product));
  }
  SearchProduct(products, productcode) {
    let encontrado = false;
    for (const index in products) {
      if (products[index].code == productcode) {
        encontrado = true;
        break;
      }
    }

    return encontrado;
  }
  async addProduct(product) {
    await this.getProducts();
    if (!fs.existsSync(this.path)) {
      this.PushProduct([{ ...product, id: 0 }]);
      await this.getProducts();
    } else {
      const bool = this.SearchProduct(this.products, product.code);
      if (!bool) {
        await this.PushProduct([
          ...this.products,
          { ...product, id: this.products.length },
        ]);
        await this.getProducts();
        return true;
      } else {
        return false;
      }
    }
  }
  async getProductById(id) {
    await this.getProducts();
    let aux = this.products.filter((product) => product.id == id);
    if (aux.length > 0) {
      return aux;
    }
  }
  async updateProduct(id, update) {
    await this.getProducts();
    let found = false;
    let products = this.products;
    for (const index in products) {
      if (products[index].id === id) {
        products[index] = { ...products[index], ...update };
        found = true;
      }
    }
    if (found) {
      this.PushProduct(products);
      await this.getProducts();
      return found;
    } else {
      return found;
    }
  }
  async DeleteProduct(id) {
    await this.getProducts();
    let i = 0;
    let removed = this.products.splice(id, 1);
    if (removed.length > 0) {
      this.products.map((ele) => {
        ele.id = i;
        i++;
      });
      this.PushProduct(this.products);
      await this.getProducts();
      return true;
    } else {
      console.log("No existe ningun producto a eliminar");
      return false;
    }
  }
}
