import { Router } from "express";
import UsersController from "../controllers/UsersController";
import multer from "multer";
import multerConfig from "../../../config/multerConfig";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(multerConfig);

usersRouter.post("/", usersController.create); //
usersRouter.get("/:id", usersController.searchByTitle); //
usersRouter.get("/", usersController.usersList); //
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
);
usersRouter.delete("/:id", isAuthenticated, usersController.delete);

export default usersRouter;
