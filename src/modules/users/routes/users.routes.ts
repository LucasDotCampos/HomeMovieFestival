import { Router } from "express";
import UsersController from "../controllers/UsersController";
import multer from "multer";
import multerConfig from "../../../config/multerConfig";

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(multerConfig);

usersRouter.post("/", upload.single("avatar"), usersController.create);
usersRouter.get("/:name", usersController.searchByName);
usersRouter.get("/", usersController.usersList);

export default usersRouter;
