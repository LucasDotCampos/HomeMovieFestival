import { inject, injectable } from "tsyringe";
import { getRepository } from "typeorm";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import UserEntity from "../infra/typeorm/entities/UserEntity";

@injectable()
class UsersListServices {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    public async execute(): Promise<UserEntity[]> {
        const users = await this.usersRepository.findAll();

        return users;
    }
}

export default UsersListServices;
