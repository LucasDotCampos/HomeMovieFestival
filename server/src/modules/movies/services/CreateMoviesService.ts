import { getCustomRepository } from "typeorm";
import { ICreateMovie } from "../domain/models";
import MoviesEntity from "../infra/typeorm/entities/MoviesEntity";
import MoviesRepository from "../infra/typeorm/repositories/MoviesRepository";

class CreateMoviesService {
    public async execute({
        description,
        image,
        magnet,
        title,
        releaseDate,
        userId,
    }: ICreateMovie): Promise<MoviesEntity> {
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
