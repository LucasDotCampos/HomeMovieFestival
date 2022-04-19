import { inject, injectable } from "tsyringe";
import { IMovie } from "../domain/models";
import { IMovieRepository } from "../domain/repositories/IMovieRepository";

@injectable()
class ListMoviesService {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ) {}
    public async execute(): Promise<IMovie[]> {
        const movies = await this.movieRepository.findAll();
        return movies;
    }
}

export default ListMoviesService;
