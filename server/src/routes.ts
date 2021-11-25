import { Router } from "express";
import path from "path";
import UsersController from "./controllers/UsersController";
import multer from "multer";
import multerConfig from "./MulterConfig/";
import MoviesController from "./controllers/MoviesController";
import Authentication from "./controllers/Authentication";
import authMiddleware from "./middleware";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/register", UsersController.store);
routes.post("/getuser", UsersController.getUser);
routes.post("/authentication", Authentication.authenticate);
routes.post("/newmovie", upload.single("image"), MoviesController.store);

routes.get("/movies", MoviesController.getAll); //! authMiddleware
routes.get("/:username", MoviesController.getByUser);

export default routes;
