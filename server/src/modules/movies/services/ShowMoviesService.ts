import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IRequest {
  id: string;
}

class ShowMovieService {
  public async execute({ id }: IRequest): Promise<MoviesEntity | undefined> {
    const movieRepository = getCustomRepository(MoviesRepository);

    const movie = await movieRepository.find({ id });

    if (!movie) {
      throw new AppError("Movie not found.");
    }

    return movie;
  }
}

export default ShowMovieService;
