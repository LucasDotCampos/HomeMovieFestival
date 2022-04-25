import { inject, injectable } from "tsyringe";
import { IUserId } from "../domain/models";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import UserEntity from "../infra/typeorm/entities/UserEntity";

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
