import { getCustomRepository } from "typeorm";
import path from "path";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import multerConfig from "../../../config/multerConfig";
import fs from "fs";

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

    if (user.avatar) {
      const userAvatarFilePath = path.join(multerConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      const checkStandardPic = path.join(
        multerConfig.directory,
        "profilepic.png"
      );

      if (userAvatarFileExists && !checkStandardPic) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
