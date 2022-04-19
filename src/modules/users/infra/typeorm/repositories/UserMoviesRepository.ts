import { Repository, getRepository } from "typeorm";
import MoviesEntity from "../../../../movies/infra/typeorm/entities/MoviesEntity";
import { IUserMoviesRepository } from "../../../domain/repositories/IUserMoviesRepository";

class UserMoviesRepository implements IUserMoviesRepository {
    private ormRepository: Repository<MoviesEntity>;
    constructor() {
        this.ormRepository = getRepository(MoviesEntity);
    }

    public async findById(userId: string): Promise<MoviesEntity[] | undefined> {
        const movies = await this.ormRepository.find({
            where: {
                userId,
            },
        });

        return movies;
    }

    public async remove(userMovies: MoviesEntity[]): Promise<void> {
        await this.ormRepository.remove(userMovies);
    }

    public async findUserMovies(userId: string): Promise<MoviesEntity[]> {
        const userMovies = await this.ormRepository.find({
            where: {
                userId,
            },
        });

        return userMovies;
    }
}

export default UserMoviesRepository;
