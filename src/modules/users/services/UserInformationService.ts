import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IUserId } from "../domain/models";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import UserEntity from "../infra/typeorm/entities/UserEntity";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

@injectable()
class UserInformationService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    public async execute({ userId }: IUserId): Promise<UserEntity> {
        const user = await this.usersRepository.findById(userId);

        return user;
    }
}

export default UserInformationService;
