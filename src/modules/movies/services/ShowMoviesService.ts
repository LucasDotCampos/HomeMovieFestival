import { inject, injectable } from "tsyringe";
import { IMovieTitle } from "../domain/models";
import { IMovieRepository } from "../domain/repositories/IMovieRepository";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";

@injectable()
class ShowMovieService {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ) {}
    public async execute({
        title,
    }: IMovieTitle): Promise<MoviesEntity | undefined> {
        const movie = await this.movieRepository.findByTitle(title);
        return movie;
    }
}

export default ShowMovieService;
