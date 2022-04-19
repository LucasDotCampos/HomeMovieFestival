import { ICreateMovie, IMovie } from "../models";

export interface IMovieRepository {
    findAll(): Promise<IMovie[]>;
    findByTitle(title: string): Promise<IMovie>;
    findById(id: string): Promise<IMovie>;
    findByemail(email: string): Promise<IMovie>;
    findByMovieId(id: string): Promise<IMovie>;
    create(data: ICreateMovie): Promise<IMovie>;
    save(movie: IMovie): Promise<IMovie>;
    remove(movie: IMovie): Promise<void>;
}
