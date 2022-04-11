import { getCustomRepository } from "typeorm";
import MoviesEntity from "../../movies/infra/typeorm/entities/MoviesEntity";
import { IUserId } from "../domain/models";
import UserMoviesRepository from "../infra/typeorm/repositories/UserMoviesRepository";

class ListMoviesUserService {
    public async execute({ userId }: IUserId): Promise<MoviesEntity[]> {
        const userMoviesRepository = getCustomRepository(UserMoviesRepository);

        const userMovies = await userMoviesRepository.findById(userId);

        return userMovies;
    }
}

export default ListMoviesUserService;
