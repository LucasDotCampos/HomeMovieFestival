import { getCustomRepository } from "typeorm";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IPaginationMovies {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: MoviesEntity[];
}

class ListMoviesService {
  public async execute(): Promise<IPaginationMovies> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.createQueryBuilder().paginate();

    return movies as IPaginationMovies;
  }
}

export default ListMoviesService;
