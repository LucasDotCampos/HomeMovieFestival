import { getCustomRepository } from "typeorm";
import { IUserId } from "../domain/models";
import UserEntity from "../infra/typeorm/entities/UserEntity";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class UserInformationService {
    public async execute({ userId }: IUserId): Promise<UserEntity> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(userId);

        return user;
    }
}

export default UserInformationService;
