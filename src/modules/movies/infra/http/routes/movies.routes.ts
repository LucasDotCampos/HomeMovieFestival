import { Router } from "express";
import MoviesController from "../controllers/MoviesController";
import multer from "multer";
import multerConfig from "../../../../../config/multerConfig";
import isAuthenticated from "../../../../../shared/middlewares/isAuthenticated";

const moviesRouter = Router();
const moviesController = new MoviesController();

const upload = multer(multerConfig);

moviesRouter.get("/", moviesController.index);
moviesRouter.get("/:title", moviesController.show);
moviesRouter.get("/id/:id", moviesController.movieById);
moviesRouter.post(
    "/createmovie",
    isAuthenticated,
    upload.single("image"),
    moviesController.create
);
moviesRouter.put(
    "/:id",
    isAuthenticated,
    upload.single("image"),
    moviesController.update
);
moviesRouter.delete("/:id", isAuthenticated, moviesController.delete);

export default moviesRouter;
