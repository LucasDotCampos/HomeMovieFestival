import { Router } from "express";
import MoviesController from "../controllers/MoviesController";
import multer from "multer";
import multerConfig from "../../../../config/multerConfig";
import isAuthenticated from "../../../../shared/http/middlewares/isAuthenticated";
import S3ImageController from "../../../../shared/http/middlewares/S3ImageController";

const moviesRouter = Router();
const moviesController = new MoviesController();
const s3ImageController = new S3ImageController();
const upload = multer(multerConfig);

moviesRouter.get("/", moviesController.index);
moviesRouter.get("/:title", moviesController.show);
moviesRouter.post(
    "/createmovie",
    isAuthenticated,
    upload.single("image"),
    // s3ImageController.upload,
    moviesController.create
);
moviesRouter.put(
    "/:id",
    isAuthenticated,
    upload.single("image"),
    // s3ImageController.upload,
    moviesController.update
);
moviesRouter.delete("/:id", isAuthenticated, moviesController.delete);

export default moviesRouter;
