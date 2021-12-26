import { EntityRepository, Repository } from "typeorm";
import MoviesEntity from "../../../movies/typeorm/entities/MoviesEntity";

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
}

export default UserMoviesRepository;
