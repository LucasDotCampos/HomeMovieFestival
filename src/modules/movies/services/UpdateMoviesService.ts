import { injectable, inject } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IMovieUpdate } from "../domain/models";
import { IMovieRepository } from "../domain/repositories/IMovieRepository";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

@injectable()
class UpdateMoviesService {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ) {}
    public async execute({
        id,
        description,
        image,
        magnet,
        title,
        releaseDate,
    }: IMovieUpdate): Promise<MoviesEntity> {
        const movies = await this.movieRepository.findByMovieId(id);

        if (!movies) {
            throw new Error("Movie not found.");
        }

        movies.title = title;
        movies.description = description;
        movies.image = image;
        movies.magnet = magnet;
        movies.releaseDate = releaseDate;

        await this.movieRepository.save(movies);

        return movies;
    }
}

export default UpdateMoviesService;
