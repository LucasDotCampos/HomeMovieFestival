import { Router } from "express";
import MoviesController from "../controllers/MoviesController";
import multer from "multer";
import multerConfig from "../../../config/multerConfig";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const moviesRouter = Router();
const moviesController = new MoviesController();
const upload = multer(multerConfig);

moviesRouter.get("/", isAuthenticated, moviesController.index);
moviesRouter.get("/:id", moviesController.show);
moviesRouter.post(
  "/createmovie",
  isAuthenticated,
  upload.single("image"),
  moviesController.create
);
moviesRouter.put("/:id", moviesController.update);
moviesRouter.delete("/:id", moviesController.delete);

export default moviesRouter;
