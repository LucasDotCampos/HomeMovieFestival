import { Repository } from "typeorm";
import { dataSource } from "../../../../../shared/typeorm/connection";
import { IUser } from "../../../domain/models";
import { IUsersRepository } from "../../../domain/repositories/IUsersRepository";
import UserEntity from "../entities/UserEntity";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<UserEntity>;
    constructor() {
        this.ormRepository = dataSource.manager.getRepository(UserEntity);
    }

    public async create({
        name,
        email,
        password,
        avatar,
    }: Partial<IUser>): Promise<UserEntity> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
            avatar,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: UserEntity): Promise<UserEntity> {
        await this.ormRepository.save(user);

        return user;
    }

    public async remove(user: UserEntity): Promise<void> {
        await this.ormRepository.remove(user);
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findByName(name: string): Promise<UserEntity | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return user;
    }

    public async findById(userId: string): Promise<UserEntity | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                id: userId,
            },
        });

        return user;
    }

    public async findByemail(email: string): Promise<UserEntity | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                email: email,
            },
        });

        return user;
    }
}

export default UsersRepository;
