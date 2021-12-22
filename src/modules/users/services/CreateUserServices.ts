import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<UserEntity> {
    try {
      const usersRepository = getCustomRepository(UsersRepository);
      const emailExists = await usersRepository.findByName(email);

      if (emailExists) {
        throw new Error("Email address already taken");
      }

      const hashedPassword = await hash(password, 8);

      const user = usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await usersRepository.save(user);
      return user;
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default CreateUserService;
