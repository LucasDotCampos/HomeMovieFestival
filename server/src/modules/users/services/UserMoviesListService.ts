import { inject, injectable } from "tsyringe";
import MoviesEntity from "../../movies/infra/typeorm/entities/MoviesEntity";
import { IUserId } from "../domain/models";
import { IUserMoviesRepository } from "../domain/repositories/IUserMoviesRepository";

@injectable()
class UserMoviesListService {
    constructor(
        @inject("UserMoviesRepository")
        private userMoviesRepository: IUserMoviesRepository
    ) {}
    public async execute({ userId }: IUserId): Promise<MoviesEntity[]> {
        const userMovies = await this.userMoviesRepository.findUserMovies(
            userId
        );

        return userMovies;
    }
}

export default UserMoviesListService;
