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

usersRouter.post("/", upload.single("avatar"), usersController.create);
usersRouter.get("/:name", usersController.searchByName);
usersRouter.get("/", usersController.usersList);
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
);

export default usersRouter;
