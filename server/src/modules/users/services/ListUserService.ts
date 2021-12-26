import { getCustomRepository } from "typeorm";
import MoviesEntity from "../../movies/typeorm/entities/MoviesEntity";
import MoviesRepository from "../../movies/typeorm/repositories/MoviesRepository";
import UserMoviesRepository from "../typeorm/repositories/UserMoviesRepository";

interface IUser {
  userId: string;
}
class ListMoviesUserService {
  public async execute({ userId }: IUser): Promise<MoviesEntity[]> {
    const userMoviesRepository = getCustomRepository(UserMoviesRepository);

    const userMovies = await userMoviesRepository.findById(userId);

    return userMovies;
  }
}

export default ListMoviesUserService;
