import UserEntity from "../infra/typeorm/entities/UserEntity";
import { ICreateUser } from "../domain/models";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}
    public async execute({
        name,
        email,
        password,
        avatar,
    }: ICreateUser): Promise<UserEntity> {
        const emailExists = await this.usersRepository.findByemail(email);

        if (emailExists) {
            throw new Error("Email address already exists");
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            avatar: "89a11137a396-profilepic.png",
        });

        return user;
    }
}

export default CreateUserService;
