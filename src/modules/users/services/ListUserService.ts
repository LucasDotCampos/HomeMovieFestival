import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IUser {
  name: string;
}
class ListUserService {
  public async execute({ name }: IUser): Promise<UserEntity> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByName(name);

    return user;
  }
}

export default ListUserService;
