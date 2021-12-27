import { getCustomRepository } from "typeorm";
import UserMoviesRepository from "../typeorm/repositories/UserMoviesRepository";
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
    } else if (users) {
      const userMoviesRepository = getCustomRepository(UserMoviesRepository);

      const userMovies = await userMoviesRepository.MoviesById(id);
      await userMoviesRepository.remove(userMovies);
    }

    await usersRepository.remove(users);
  }
}

export default DeleteUsersService;
