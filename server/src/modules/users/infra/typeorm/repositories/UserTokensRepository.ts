import { getRepository, Repository } from "typeorm";
import { IUserTokensRepository } from "../../../domain/repositories/IUsersTokenRepository";
import UserTokenEntity from "../entities/UserTokenEntity";

class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserTokenEntity>;

    constructor() {
        this.ormRepository = getRepository(UserTokenEntity);
    }

    public async findByToken(
        token: string
    ): Promise<UserTokenEntity | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: {
                token,
            },
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserTokenEntity> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
