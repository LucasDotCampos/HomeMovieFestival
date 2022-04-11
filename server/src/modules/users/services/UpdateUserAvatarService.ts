import { getCustomRepository } from "typeorm";
import { IUserUpdateAvatar } from "../domain/models";
import UserEntity from "../infra/typeorm/entities/UserEntity";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class UpdateUserAvatarService {
    public async execute({
        userId,
        avatarFilename,
    }: IUserUpdateAvatar): Promise<UserEntity> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
