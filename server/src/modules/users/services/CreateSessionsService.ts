import AppError from "../../../shared/errors/AppError";
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
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const usersRepository = getCustomRepository(UsersRepository);
      const user = await usersRepository.findByemail(email);

      if (!user) {
        throw new AppError("Incorrect email/password combination", 401);
      }

      const passwordConfirmed = await compare(password, user.password);

      if (!passwordConfirmed) {
        throw new AppError("Incorrect email/password combination", 401);
      }

      const token = sign({}, authConfig.jwt.secret, {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      });

      return {
        user,
        token,
      };
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default CreateSessionsService;
