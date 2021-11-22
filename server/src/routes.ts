import express, { Router } from "express";
import path from "path";
import UsersController from "./controllers/UsersController";
import multer from "multer";
import multerConfig from "./MulterConfig/";
import MoviesController from "./controllers/MoviesController";
import Authentication from "./controllers/Authentication";

const app = express();

const routes = Router();
const upload = multer(multerConfig);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads"))); //upload de imagens

routes.post("/createuser", UsersController.store);
routes.post("/authentication", Authentication.authenticate);
routes.post("/new", upload.single("image"), MoviesController.store);
routes.get("/movies", MoviesController.getAll);

export default routes;
