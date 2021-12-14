import { Router } from "express";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/", usersController.create);
usersRouter.get("/:name", usersController.searchByName);
usersRouter.get("/", usersController.usersList);

export default usersRouter;
