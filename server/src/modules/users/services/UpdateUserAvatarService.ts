import fs from "fs";
import path from "path";
import { getCustomRepository } from "typeorm";

import multerConfig from "../../../config/multerConfig";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({
        userId,
        avatarFilename,
    }: IRequest): Promise<UserEntity> {
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
