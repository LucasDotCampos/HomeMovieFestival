import { getCustomRepository } from "typeorm";
import { IMovieId } from "../domain/models";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

class DeleteMoviesService {
    public async execute({ id }: IMovieId): Promise<void> {
        const moviesRepository = getCustomRepository(MoviesRepository);

        const movies = await moviesRepository.findOne(id);

        if (!movies) {
            throw new Error("Movie not found.");
        }

        await moviesRepository.remove(movies);
    }
}

export default DeleteMoviesService;
