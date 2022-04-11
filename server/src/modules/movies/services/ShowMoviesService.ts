import { getCustomRepository } from "typeorm";
import { IMovieTitle } from "../domain/models";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

class ShowMovieService {
    public async execute({
        title,
    }: IMovieTitle): Promise<MoviesEntity | undefined> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findByTitle(title);

        if (!movie) {
            throw new Error("Movie not found.");
        }

        return movie;
    }
}

export default ShowMovieService;
