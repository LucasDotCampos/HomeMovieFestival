import { container } from "tsyringe";
import { IMovieRepository } from "../../../modules/movies/domain/repositories/IMovieRepository";
import MoviesRepository from "../../../modules/movies/infra/typeorm/repositories/MoviesRepository";
import { IUserMoviesRepository } from "../../../modules/users/domain/repositories/IUserMoviesRepository";
import { IUsersRepository } from "../../../modules/users/domain/repositories/IUsersRepository";
import { IUserTokensRepository } from "../../../modules/users/domain/repositories/IUsersTokenRepository";
import UserMoviesRepository from "../../../modules/users/infra/typeorm/repositories/UserMoviesRepository";
import UsersRepository from "../../../modules/users/infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../../../modules/users/infra/typeorm/repositories/UserTokensRepository";
import "../../../modules/users/providers";

container.registerSingleton<IMovieRepository>(
    "MovieRepository",
    MoviesRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository",
    UserTokensRepository
);

container.registerSingleton<IUserMoviesRepository>(
    "UserMoviesRepository",
    UserMoviesRepository
);
