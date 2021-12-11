import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserEntity from '../typeorm/entities/UserEntity';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<UserEntity> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByName(email);

    if (emailExists) {
      throw new AppError('Email address already taken');
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
