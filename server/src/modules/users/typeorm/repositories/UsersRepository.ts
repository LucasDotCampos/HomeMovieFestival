import { EntityRepository, Repository } from "typeorm";
import UserEntity from "../entities/UserEntity";

@EntityRepository(UserEntity)
class UsersRepository extends Repository<UserEntity> {
    public async findByName(name: string): Promise<UserEntity | undefined> {
        const user = await this.findOne({
            where: {
                name,
            },
        });

        return user;
    }

    public async findById(userId: string): Promise<UserEntity | undefined> {
        const user = await this.findOne({
            where: {
                id: userId,
            },
        });

        return user;
    }

    public async findByemail(email: string): Promise<UserEntity | undefined> {
        const user = await this.findOne({
            where: {
                email: email,
            },
        });

        return user;
    }
}

export default UsersRepository;
