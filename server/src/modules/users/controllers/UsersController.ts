import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserServices";
import ListUsersService from "../services/ListUsersServices";
import ListUserService from "../services/ListUserService";
import DeleteUsersService from "../services/DeleteMoviesService";

export default class UsersController {
  public async searchByTitle(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const listUser = new ListUserService();

      const users = await listUser.execute({ id });

      return response.status(200).json(users);
    } catch (err) {
      return response.json(err.message);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();
      const user = await createUser.execute({
        name,
        email,
        password,
        avatar: "profilepic.png",
      });

      delete user.password;

      return response.status(200).json(user);
    } catch (err) {
      return response.json(err.message);
    }
  }

  public async usersList(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const ListUsersServices = new ListUsersService();

      const users = await ListUsersServices.execute();
      return response.json(users);
    } catch (err) {
      return response.json(err.message);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const deleteUsers = new DeleteUsersService();
      await deleteUsers.execute({ id });
      return response.status(200).json([]);
    } catch (err) {
      return response.status(424).json(err.message);
    }
  }
}
