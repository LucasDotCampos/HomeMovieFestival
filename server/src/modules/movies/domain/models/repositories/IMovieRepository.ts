import { ICreateMovie, IMovie } from "..";

export interface IMovieRepository {
    findAll(): Promise<IMovie[]>;
    findByTitle(title: string): Promise<IMovie | undefined>;
    findById(id: string): Promise<IMovie | undefined>;
    findByemail(email: string): Promise<IMovie | undefined>;
    findByMovieId(id: string): Promise<IMovie | undefined>;
    create(data: ICreateMovie): Promise<IMovie>;
    save(movie: IMovie): Promise<IMovie>;
    remove(movie: IMovie): Promise<void>;
}
