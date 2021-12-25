import { Request, Response } from "express";
import CreateMoviesService from "../services/CreateMoviesService";
import DeleteMoviesService from "../services/DeleteMoviesService";
import ListMoviesService from "../services/ListMoviesService";
import ShowMovieService from "../services/ShowMoviesService";
import UpdateMoviesService from "../services/UpdateMoviesService";

export default class MoviesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMovies = new ListMoviesService();

    const movies = await listMovies.execute();

    return response.json(movies);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { title } = request.params;
    const showMovie = new ShowMovieService();
    const movie = await showMovie.execute({ title });
    return response.json(movie);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, magnet, username, title, releaseDate } = request.body;
    try {
      const createMovies = new CreateMoviesService();

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, image, magnet, title } = request.body;
    const { id } = request.params;

    const updateMovie = new UpdateMoviesService();
    const movie = await updateMovie.execute({
      id,
      description,
      image,
      magnet,
      title,
    });
    return response.status(409).json(movie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMovie = new DeleteMoviesService();
    await deleteMovie.execute({ id });
    return response.json([]);
  }
}
