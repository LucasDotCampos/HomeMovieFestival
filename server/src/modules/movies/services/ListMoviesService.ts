import { getCustomRepository } from "typeorm";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

class ListMoviesService {
    public async execute(): Promise<MoviesEntity[]> {
        const moviesRepository = getCustomRepository(MoviesRepository);

        const movies = moviesRepository.find();

        return movies;
    }
}

export default ListMoviesService;
