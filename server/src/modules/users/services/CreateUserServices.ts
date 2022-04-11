import { getCustomRepository } from "typeorm";

import { hash } from "bcryptjs";
import UserEntity from "../infra/typeorm/entities/UserEntity";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        avatar,
    }: IRequest): Promise<UserEntity> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByemail(email);

        if (emailExists) {
            throw new Error("Email address already exists");
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
