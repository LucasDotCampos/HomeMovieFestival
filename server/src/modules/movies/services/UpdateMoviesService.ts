import { getCustomRepository } from "typeorm";
import { IMovieUpdate } from "../domain/models";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

class UpdateMoviesService {
    public async execute({
        id,
        description,
        image,
        magnet,
        title,
        releaseDate,
    }: IMovieUpdate): Promise<MoviesEntity> {
        const moviesRepository = getCustomRepository(MoviesRepository);

        const movies = await moviesRepository.findByMovieId(id);

        if (!movies) {
            throw new Error("Movie not found.");
        }
        id = movies.id;
        movies.title = title;
        movies.description = description;
        movies.image = image;
        movies.magnet = magnet;
        movies.releaseDate = releaseDate;

        await moviesRepository.save(movies);

        return movies;
    }
}

export default UpdateMoviesService;
