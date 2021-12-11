import { getCustomRepository } from 'typeorm';
import UserEntity from '../typeorm/entities/UserEntity';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<UserEntity[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
