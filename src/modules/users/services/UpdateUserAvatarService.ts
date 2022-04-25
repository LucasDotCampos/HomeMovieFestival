import { inject, injectable } from "tsyringe";
import { IUserUpdateAvatar } from "../domain/models";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import UserEntity from "../infra/typeorm/entities/UserEntity";

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    public async execute({
        userId,
        avatarFilename,
    }: IUserUpdateAvatar): Promise<UserEntity> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
