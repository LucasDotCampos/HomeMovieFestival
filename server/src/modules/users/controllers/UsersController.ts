import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserServices";
import ListUsersService from "../services/ListUsersServices";
import ListUserService from "../services/ListUserService";

export default class UsersController {
  public async searchByName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name } = request.params;
    const listUser = new ListUserService();

    const users = await listUser.execute({ name });

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.status(401).json(user);
  }

  public async usersList(response: Response): Promise<Response> {
    const ListUsersServices = new ListUsersService();

    const users = await ListUsersServices.execute();

    return response.json(users);
  }
}
