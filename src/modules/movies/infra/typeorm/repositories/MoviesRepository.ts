import { getRepository, Like, Repository } from "typeorm";
import { ICreateMovie, IMovieTitle } from "../../../domain/models";
import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import MoviesEntity from "../entities/MoviesEntity";

class MoviesRepository implements IMovieRepository {
    private ormRepository: Repository<MoviesEntity>;
    constructor() {
        this.ormRepository = getRepository(MoviesEntity);
    }

    public async findAll(): Promise<MoviesEntity[]> {
        const movies = await this.ormRepository.find({
            order: {
                title: "ASC",
            },
        });

        return movies;
    }

    public async create({
        description,
        image,
        magnet,
        title,
        releaseDate,
        userId,
    }: ICreateMovie): Promise<MoviesEntity> {
        const user = this.ormRepository.create({
            description,
            image,
            magnet,
            title,
            releaseDate,
            userId,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(movie: MoviesEntity): Promise<MoviesEntity> {
        await this.ormRepository.save(movie);
        return movie;
    }

    public async remove(movie: MoviesEntity): Promise<void> {
        await this.ormRepository.remove(movie);
    }

    public async findByTitle(title: string): Promise<MoviesEntity | undefined> {
        const movies = await this.ormRepository.findOne({
            where: {
                title: title,
            },
            relations: ["userId"],
        });

        return movies;
    }

    public async findById(id: string): Promise<MoviesEntity | undefined> {
        const movies = this.ormRepository.findOne({
            where: {
                id: id,
            },
        });

        return movies;
    }

    public async findByemail(email: string): Promise<MoviesEntity | undefined> {
        const movies = await this.ormRepository.findOne({
            where: {
                email,
            },
        });

        return movies;
    }

    public async findByMovieId(id: string): Promise<MoviesEntity | undefined> {
        const movies = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return movies;
    }
}

export default MoviesRepository;
