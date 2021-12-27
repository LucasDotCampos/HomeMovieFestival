import { getCustomRepository } from "typeorm";
import MoviesEntity from "../../movies/typeorm/entities/MoviesEntity";
import UserEntity from "../typeorm/entities/UserEntity";
import UserMoviesRepository from "../typeorm/repositories/UserMoviesRepository";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IUser {
  id: string;
}
class UserInformationService {
  public async execute({ id }: IUser): Promise<UserEntity> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(id);

    return user;
  }
}

export default UserInformationService;
