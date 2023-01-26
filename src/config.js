import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  app.set("views", __dirname + "/views");
  app.set("view engine", "handlebars");
};
