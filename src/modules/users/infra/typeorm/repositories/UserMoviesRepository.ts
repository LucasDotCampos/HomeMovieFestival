import { Repository } from "typeorm";
import { dataSource } from "../../../../../shared/typeorm/connection";
import MoviesEntity from "../../../../movies/infra/typeorm/entities/MoviesEntity";
import { IUserMoviesRepository } from "../../../domain/repositories/IUserMoviesRepository";

class UserMoviesRepository implements IUserMoviesRepository {
    private ormRepository: Repository<MoviesEntity>;
    constructor() {
        this.ormRepository = dataSource.manager.getRepository(MoviesEntity);
    }

    public async findById(userId: string): Promise<MoviesEntity[] | undefined> {
        const movies = await this.ormRepository.find({
            where: {
                id: userId,
            },
        });

        return movies;
    }

    public async remove(userMovies: MoviesEntity[]): Promise<void> {
        await this.ormRepository.remove(userMovies);
    }

    public async findUserMovies(userId: string): Promise<MoviesEntity[]> {
        const userMovies = this.ormRepository.query(
            `SELECT movies.*  FROM movies 
        JOIN users 
        ON movies.user_id = users.id
        where users.id = '${userId}'
        ORDER BY movies.title ASC
          `
        );

        return userMovies;
    }
}

export default UserMoviesRepository;
