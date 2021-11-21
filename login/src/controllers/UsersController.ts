import { json, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
class UsersController {
  async store(request: Request, response: Response) {
    const repository = getRepository(Users);

    const { username, email, password } = request.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return response.sendStatus(409).json("This email is already registered");
    }
    const user = repository.create({
      username,
      email,
      password,
    });
    await repository.save(user);
    return response.json(user);
  }
}

export default new UsersController();
