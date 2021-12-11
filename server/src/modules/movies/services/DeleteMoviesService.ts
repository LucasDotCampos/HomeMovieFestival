import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';

interface IRequest {
  id: string;
}

class DeleteMoviesService {
  public async execute({ id }: IRequest): Promise<void> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.findOne(id);

    if (!movies) {
      throw new AppError('Product not found.');
    }

    await moviesRepository.remove(movies);
  }
}

export default DeleteMoviesService;
