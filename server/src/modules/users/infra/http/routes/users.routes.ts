import { Router } from "express";
import UsersController from "../controllers/UsersController";
import multer from "multer";
import UserAvatarController from "../controllers/UserAvatarController";
import S3ImageController from "../../../../../shared/http/middlewares/S3ImageController";
import multerConfig from "../../../../../config/multerConfig";
import isAuthenticated from "../../../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const s3ImageController = new S3ImageController();

const upload = multer(multerConfig);

usersRouter.post("/", usersController.create); //
usersRouter.get("/movies/:userId", usersController.searchById); //
usersRouter.get("/", usersController.usersList); //
usersRouter.patch(
    "/avatar",
    isAuthenticated,
    upload.single("avatar"),
    s3ImageController.upload,
    usersAvatarController.update
);
usersRouter.delete("/:userId", isAuthenticated, usersController.delete);
usersRouter.get("/:userId", usersController.userById);
usersRouter.put("/:userId", isAuthenticated, usersController.update);
export default usersRouter;
