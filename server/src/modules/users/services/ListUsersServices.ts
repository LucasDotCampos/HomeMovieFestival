import { getRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";

class ListUsersService {
  public async execute(): Promise<UserEntity[]> {
    const moviesRepository = getRepository(UserEntity);

    const users = moviesRepository.find();
    return users;
  }
}

export default ListUsersService;
