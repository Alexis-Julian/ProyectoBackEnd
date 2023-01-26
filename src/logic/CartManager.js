import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class CartManager {
  constructor(archive) {
    this.cart = [];
    this.path = path.join(__dirname, `../data/${archive}.json`);
  }
  async parswriteCart(cart) {
    await fs.promises.writeFile(this.path, JSON.stringify(cart));
  }
  async getCart() {
    try {
      this.cart = await fs.promises.readFile(this.path, "utf-8").then((res) => {
        return JSON.parse(res);
      });
    } catch {
      return false;
    }
  }
  async createCart() {
    await this.getCart();
    let completed = false;
    let id = 0;
    fs.existsSync(this.path) ? (id = this.cart.length) : id;
    try {
      if (!fs.existsSync(this.path)) {
        this.parswriteCart([{ cid: id, product: [] }]);
      } else {
        this.parswriteCart([...this.cart, { cid: id, product: [] }]);
      }
      return [!completed, id];
    } catch {
      return [completed, id];
    }
  }
  async writeCart(info) {
    await this.getCart();
    const [cart, product] = info;
    const cid = cart.cid;
    const pid = product[0].id;
    const completed = false;
    this.cart.map((c) => {
      if (c.cid == cid) {
        const index = c.product.findIndex((p) => p.id == pid);
        if (index != -1) {
          c.product[index] = {
            id: pid,
            quantity: (c.product[index].quantity += 1),
          };
        } else {
          c.product.push({ id: pid, quantity: 1 });
        }
        this.parswriteCart(this.cart);
        return !completed;
      }
    });
    return completed;
  }
  async searchCart(cid) {
    await this.getCart();
    for (const index in this.cart) {
      if (this.cart[index].cid == cid) {
        return this.cart[index];
      }
    }
  }
}
