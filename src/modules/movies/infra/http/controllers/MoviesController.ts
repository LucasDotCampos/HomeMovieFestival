import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateMoviesService from "../../../services/CreateMoviesService";
import DeleteMoviesService from "../../../services/DeleteMoviesService";
import ListMoviesService from "../../../services/ListMoviesService";
import ShowMovieService from "../../../services/ShowMoviesService";
import UpdateMoviesService from "../../../services/UpdateMoviesService";

export default class MoviesController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const listMovies = container.resolve(ListMoviesService);
            const movies = await listMovies.execute();
            return response.status(200).json(movies);
        } catch (err) {
            return response.status(409).json(err.message);
        }
    }

    public async show(request: Request, response: Response): Promise<Response> {
        try {
            const { title } = request.params;
            const showMovie = container.resolve(ShowMovieService);
            const movie = await showMovie.execute({ title });
            return response.json(movie);
        } catch (err) {
            return response.status(404).json(err);
        }
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { description, magnet, title, releaseDate } = request.body;
            const createMovies = container.resolve(CreateMoviesService);
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
            const updateMovie = container.resolve(UpdateMoviesService);

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
            return response.status(404).json(err.message);
        }
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { id } = request.params;
            const deleteMovie = container.resolve(DeleteMoviesService);
            await deleteMovie.execute({ id });
            return response.json("Movie deleted successfully");
        } catch (err) {
            return response.status(404).json(err.message);
        }
    }
}
