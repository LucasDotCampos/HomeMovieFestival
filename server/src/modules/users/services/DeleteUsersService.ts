import { getCustomRepository } from "typeorm";
import { IUserId } from "../domain/models";
import UserMoviesRepository from "../infra/typeorm/repositories/UserMoviesRepository";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class DeleteUsersService {
    public async execute({ userId }: IUserId): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.findOne(userId);

        if (!users) {
            throw new Error("User not found.");
        } else if (users) {
            const userMoviesRepository =
                getCustomRepository(UserMoviesRepository);

            const userMovies = await userMoviesRepository.MoviesById(userId);
            await userMoviesRepository.remove(userMovies);
        }

        await usersRepository.remove(users);
    }
}

export default DeleteUsersService;
