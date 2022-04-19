import { inject, injectable } from "tsyringe";
import { ICreateMovie, IMovie } from "../domain/models";
import { IMovieRepository } from "../domain/repositories/IMovieRepository";

@injectable()
class CreateMoviesService {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ) {}
    public async execute({
        description,
        image,
        magnet,
        title,
        releaseDate,
        userId,
    }: ICreateMovie): Promise<IMovie> {
        const movies = this.movieRepository.create({
            description,
            image,
            magnet,
            title,
            releaseDate,
            userId,
        });

        return movies;
    }
}

export default CreateMoviesService;
