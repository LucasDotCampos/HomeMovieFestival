import { getRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";

class ListUsersService {
  public async execute(): Promise<UserEntity[]> {
    const usersRepository = getRepository(UserEntity);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUsersService;
