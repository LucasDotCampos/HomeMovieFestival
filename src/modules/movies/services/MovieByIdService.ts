import { inject, injectable } from "tsyringe";
import { IMovieId, IMovieTitle } from "../domain/models";
import { IMovieRepository } from "../domain/repositories/IMovieRepository";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";

@injectable()
class MovieByIdService {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ) {}
    public async execute({ id }: IMovieId): Promise<MoviesEntity | undefined> {
        const movie = await this.movieRepository.findById(id);
        return movie;
    }
}

export default MovieByIdService;
