import { IMovie } from "../../../movies/domain/models";

export interface IUserMoviesRepository {
    findUserMovies(userId: string): Promise<IMovie[]>;
    findById(userId: string): Promise<IMovie[] | undefined>;
    remove(userMovies: IMovie[]): Promise<void>;
}
