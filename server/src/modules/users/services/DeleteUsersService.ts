import { injectable, inject } from "tsyringe";
import { IUserId } from "../domain/models";
import { IUserMoviesRepository } from "../domain/repositories/IUserMoviesRepository";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
class DeleteUsersService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserMoviesRepository")
        private userMoviesRepository: IUserMoviesRepository
    ) {}
    public async execute({ userId }: IUserId): Promise<void> {
        const users = await this.usersRepository.findById(userId);

        if (!users) {
            throw new Error("User not found.");
        }

        const userMovies = await this.userMoviesRepository.findById(userId);

        await this.userMoviesRepository.remove(userMovies);
        await this.usersRepository.remove(users);
    }
}

export default DeleteUsersService;
