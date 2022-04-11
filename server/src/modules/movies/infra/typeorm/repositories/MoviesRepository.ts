import { EntityRepository, Repository } from "typeorm";
import MoviesEntity from "../entities/MoviesEntity";

@EntityRepository(MoviesEntity)
class MoviesRepository extends Repository<MoviesEntity> {
  public async findByTitle(title: string): Promise<MoviesEntity | undefined> {
    const movies = await this.findOne({
      where: {
        title: title,
      },
      relations: ["userId"],
    });

    return movies;
  }

  public async findById(userId: string): Promise<MoviesEntity | undefined> {
    const movies = await this.findOne({
      where: {
        userId: userId,
      },
    });

    return movies;
  }

  public async findByemail(email: string): Promise<MoviesEntity | undefined> {
    const movies = await this.findOne({
      where: {
        email,
      },
    });

    return movies;
  }

  public async findByMovieId(id: string): Promise<MoviesEntity | undefined> {
    const movies = await this.findOne({
      where: {
        id,
      },
    });

    return movies;
  }
}

export default MoviesRepository;
