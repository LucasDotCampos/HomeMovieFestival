import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/authConfig";
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import "dotenv/config";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: UserEntity;
    token: string;
}
class CreateSessionsService {
    public async execute({
        email,
        password,
    }: IRequest): Promise<IResponse | string> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByemail(email);

        if (!user) {
            throw new Error("email/password incorrect");
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new Error("email/password incorrect");
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        delete user.password;

        return {
            user,
            token,
        };
    }
}

export default CreateSessionsService;
