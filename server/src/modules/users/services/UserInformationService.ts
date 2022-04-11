import { getCustomRepository } from "typeorm";
import UserEntity from "../infra/typeorm/entities/UserEntity";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface IUser {
    id: string;
}
class UserInformationService {
    public async execute({ id }: IUser): Promise<UserEntity> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(id);

        return user;
    }
}

export default UserInformationService;
