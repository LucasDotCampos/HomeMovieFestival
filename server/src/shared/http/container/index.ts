import { container } from "tsyringe";
import { IMovieRepository } from "../../../modules/movies/domain/models/repositories/IMovieRepository";
import MoviesRepository from "../../../modules/movies/infra/typeorm/repositories/MoviesRepository";

container.registerSingleton<IMovieRepository>(
    "MovieRepository",
    MoviesRepository
);
