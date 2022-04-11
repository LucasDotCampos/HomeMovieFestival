import { EntityRepository, Repository } from "typeorm";
import MoviesEntity from "../../../../movies/infra/typeorm/entities/MoviesEntity";

@EntityRepository(MoviesEntity)
class UserMoviesRepository extends Repository<MoviesEntity> {
    public async findById(userId: string): Promise<MoviesEntity[] | undefined> {
        const movies = await this.find({
            where: {
                userId: userId,
            },
        });

        return movies;
    }

    public async MoviesById(id: string): Promise<MoviesEntity[] | undefined> {
        const movies = await this.find({
            where: {
                userId: id,
            },
        });

        return movies;
    }
}

export default UserMoviesRepository;
