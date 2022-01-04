import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import CreateMoviesService from "../services/CreateMoviesService";
import DeleteMoviesService from "../services/DeleteMoviesService";
import ListMoviesService from "../services/ListMoviesService";
import ShowMovieService from "../services/ShowMoviesService";
import UpdateMoviesService from "../services/UpdateMoviesService";
import MoviesEntity from "../typeorm/entities/MoviesEntity";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

export default class MoviesController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const listMovies = new ListMoviesService();

            const movies = await listMovies.execute();

            return response.status(200).json(movies);
        } catch (err) {
            return response.status(409).json(err.message);
        }
    }

    public async show(request: Request, response: Response): Promise<Response> {
        try {
            const { title } = request.params;
            const showMovie = new ShowMovieService();
            const movie = await showMovie.execute({ title });
            return response.json(movie);
        } catch (err) {
            return response.json(err.message);
        }
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response | MoviesEntity> {
        const { description, magnet, title, releaseDate } = request.body;
        try {
            const createMovies = new CreateMoviesService();
            const moviesRepository = getCustomRepository(MoviesRepository);
            const moviesExists = await moviesRepository.findByTitle(title);

            if (moviesExists) {
                response.status(400);
            }

            const movies = await createMovies.execute({
                description,
                image: request.file?.filename,
                releaseDate,
                magnet,
                title,
                userId: request.userId,
            });
            return response.json(movies);
        } catch (err) {
            return response.json(err.message);
        }
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { description, magnet, title, releaseDate } = request.body;
            const { id } = request.params;
            const updateMovie = new UpdateMoviesService();

            const movie = await updateMovie.execute({
                id,
                description,
                image: request.file?.filename,
                magnet,
                title,
                releaseDate,
                userId: request.userId,
            });
            return response.json(movie);
        } catch (err) {
            return response.status(400).json(err.message);
        }
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { id } = request.params;
            const deleteMovie = new DeleteMoviesService();
            await deleteMovie.execute({ id });
            return response.json([]);
        } catch (err) {
            return response.json(err.message);
        }
    }
}
