import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/authConfig";
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import "dotenv/config";
import { response } from "express";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: UserEntity;
    token: string;
    message: string;
}
class CreateSessionsService {
    public async execute({
        email,
        password,
    }: IRequest): Promise<IResponse | string> {
        try {
            const usersRepository = getCustomRepository(UsersRepository);
            const user = await usersRepository.findByemail(email);
            let message = "Success";

            if (!user) {
                message = "Invalid email or password";

                console.log(message);

                response.status(400);

                return message;
            }

            const passwordConfirmed = await compare(password, user.password);

            if (!passwordConfirmed) {
                message = "Invalid email or password";

                console.log(message);

                response.status(400);

                return message;
            }

            const token = sign({}, authConfig.jwt.secret, {
                subject: user.id,
                expiresIn: authConfig.jwt.expiresIn,
            });

            delete user.password;

            return {
                user,
                token,
                message,
            };
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default CreateSessionsService;
