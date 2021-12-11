import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IRequest {
  username: string;
  description: string;
  image: string;
  magnet: string;
  title: string;
  releaseDate: string;
  user: {
    id: string;
  };
}

class CreateMoviesService {
  public async execute({
    description,
    image,
    magnet,
    username,
    title,
    releaseDate,
    user,
  }: IRequest): Promise<MoviesEntity> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const moviesExists = await moviesRepository.findByTitle(title);

    if (moviesExists) {
      throw new AppError("There's already one product with this name");
    }

    const movies = moviesRepository.create({
      description,
      image,
      magnet,
      username,
      title,
      releaseDate,
      user,
    });

    await moviesRepository.save(movies);

    return movies;
  }
}

export default CreateMoviesService;
