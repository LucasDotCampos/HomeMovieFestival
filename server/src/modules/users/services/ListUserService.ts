import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IUser {
  id: string;
}
class ListUserService {
  public async execute({ id }: IUser): Promise<UserEntity> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    return user;
  }
}

export default ListUserService;
