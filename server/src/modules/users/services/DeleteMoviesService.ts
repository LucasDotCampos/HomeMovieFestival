import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}

class DeleteUsersService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findOne(id);

    if (!users) {
      throw new Error("User not found.");
    }

    await usersRepository.remove(users);
  }
}

export default DeleteUsersService;
