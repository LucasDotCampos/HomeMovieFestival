import { getCustomRepository } from "typeorm";
import { MessageChannel } from "worker_threads";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IRequest {
    description: string;
    image: string;
    magnet: string;
    title: string;
    releaseDate: string;
    userId: any;
}

class CreateMoviesService {
    public async execute({
        description,
        image,
        magnet,
        title,
        releaseDate,
        userId,
    }: IRequest): Promise<MoviesEntity> {
        const moviesRepository = getCustomRepository(MoviesRepository);
        const moviesExists = await moviesRepository.findByTitle(title);

        if (moviesExists) {
            throw new Error("There's already a movie with this title");
        }

        const movies = moviesRepository.create({
            description,
            image,
            magnet,
            title,
            releaseDate,
            userId,
        });

        await moviesRepository.save(movies);

        return movies;
    }
}

export default CreateMoviesService;
