import { inject, injectable } from "tsyringe";
import { IMovieId } from "../domain/models";
import { IMovieRepository } from "../domain/models/repositories/IMovieRepository";

@injectable()
class DeleteMoviesService {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ) {}

    public async execute({ id }: IMovieId): Promise<void> {
        const movies = await this.movieRepository.findById(id);

        if (!movies) {
            throw new Error("Movie not found.");
        }

        await this.movieRepository.remove(movies);
    }
}

export default DeleteMoviesService;
