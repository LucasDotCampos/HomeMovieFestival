import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Movies from "../models/Movies";

class MoviesController {
  async store(request: Request, response: Response) {
    try {
      const repository = getRepository(Movies);

      const { title, description, releaseDate, user, magnet } = request.body;

      const movieExists = await repository.findOne({ where: { title } });

      if (movieExists) {
        return response
          .sendStatus(409)
          .json("This movie is already registered");
      }

      const movie = repository.create({
        title,
        description,
        releaseDate,
        user,
        magnet,
        image: request.file?.filename,
      });
      await repository.save(movie);

      return response.json(movie);
    } catch (err) {
      console.log(err.message);
    }
  }

  async getAll(request: Request, response: Response) {
    const repository = getRepository(Movies);
    const index = await repository.find({});

    return response.json(index);
  }

  async getByUser(request: Request, response: Response) {
    const repository = getRepository(Movies);
    const foundContent = await repository.find({
      where: {
        user: request.params.user,
      },
    });

    response.json(foundContent);
  }
}

export default new MoviesController();
