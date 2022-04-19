import { sign } from "jsonwebtoken";
import authConfig from "../../../config/authConfig";
import { ICreateSession, IUserAuthenticated } from "../domain/models";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateSessionsService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}
    public async execute({
        email,
        password,
    }: ICreateSession): Promise<IUserAuthenticated> {
        const user = await this.usersRepository.findByemail(email);

        if (!user) {
            throw new Error("email/password incorrect");
        }

        const passwordConfirmed = await this.hashProvider.compareHash(
            password,
            user.password
        );

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
