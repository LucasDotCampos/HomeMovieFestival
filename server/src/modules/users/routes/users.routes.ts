import { Router } from "express";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post("/", usersController.create);
usersRouter.get("/list", (request, response) => console.log("hello world"));

export default usersRouter;
