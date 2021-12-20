import { getCustomRepository } from "typeorm";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IRequest {
  id: string;
  image: string;
  magnet: string;
  description: string;
  title: string;
}

class UpdateMoviesService {
  public async execute({
    id,
    description,
    image,
    magnet,
    title,
  }: IRequest): Promise<MoviesEntity> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.findOne(id);

    if (!movies) {
      throw new Error("Movie not found.");
    }

    const moviesExists = await moviesRepository.findByTitle(title);
    if (moviesExists && title !== movies.title) {
      throw new Error("There's already one movie with this name");
    }
    movies.title = title;
    movies.description = description;
    movies.image = image;
    movies.magnet = magnet;

    await moviesRepository.save(movies);
    return movies;
  }
}

export default UpdateMoviesService;
