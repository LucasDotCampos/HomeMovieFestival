import { EntityRepository, Repository } from 'typeorm';
import MoviesEntity from '../entities/MoviesEntity';

@EntityRepository(MoviesEntity)
class MoviesRepository extends Repository<MoviesEntity> {
  public async findByTitle(title: string): Promise<MoviesEntity | undefined> {
    const movies = await this.findOne({
      where: {
        title: title,
      },
    });

    return movies;
  }

  public async findById(id: string): Promise<MoviesEntity | undefined> {
    const movies = await this.findOne({
      where: {
        id,
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
}

export default MoviesRepository;
