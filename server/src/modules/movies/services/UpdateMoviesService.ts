import { getCustomRepository } from "typeorm";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IRequest {
  id: string;
  image: string;
  magnet: string;
  description: string;
  title: string;
  releaseDate: string;
}

class UpdateMoviesService {
  public async execute({
    id,
    description,
    image,
    magnet,
    title,
    releaseDate,
  }: IRequest): Promise<MoviesEntity> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.findOne(id);

    if (!movies) {
      throw new Error("Movie not found.");
    }

    movies.title = title;
    movies.description = description;
    movies.image = image;
    movies.magnet = magnet;
    movies.releaseDate = releaseDate;
    movies.id = id;

    const retorno = await moviesRepository.save(movies);
    console.log(retorno);
    return movies;
  }
}

export default UpdateMoviesService;
