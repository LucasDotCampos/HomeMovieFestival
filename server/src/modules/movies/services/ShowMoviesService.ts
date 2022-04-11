import { getCustomRepository } from "typeorm";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

interface IRequest {
    title: string;
}

class ShowMovieService {
    public async execute({
        title,
    }: IRequest): Promise<MoviesEntity | undefined> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findByTitle(title);

        if (!movie) {
            throw new Error("Movie not found.");
        }

        return movie;
    }
}

export default ShowMovieService;
