import { Router } from "express";
import UsersController from "../controllers/UsersController";
import multer from "multer";
import UserAvatarController from "../controllers/UserAvatarController";
import multerConfig from "../../../../../config/multerConfig";
import isAuthenticated from "../../../../../shared/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(multerConfig);

usersRouter.post("/", usersController.create);
usersRouter.get("/movies/:userId", usersController.userMoviesList);
usersRouter.get("/", usersController.usersList);
usersRouter.patch(
    "/avatar",
    isAuthenticated,
    upload.single("avatar"),
    usersAvatarController.update
);
usersRouter.delete("/:userId", isAuthenticated, usersController.delete);
usersRouter.get("/:userId", usersController.userById);
usersRouter.put("/:userId", isAuthenticated, usersController.update);
export default usersRouter;
