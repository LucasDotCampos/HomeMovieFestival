import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { IUserUpdate } from "../domain/models";
import UserEntity from "../infra/typeorm/entities/UserEntity";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class UpdateProfileService {
    public async execute({
        userId,
        name,
        email,
        password,
        oldPassword,
    }: IUserUpdate): Promise<UserEntity> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new Error("User not found.");
        }

        const userUpdateEmail = await usersRepository.findByemail(email);

        if (userUpdateEmail && userUpdateEmail.id !== userId) {
            throw new Error("This email already belongs to another user");
        }

        if (password && !oldPassword) {
            throw new Error("Old password is missing");
        }

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);
            if (!checkOldPassword) {
                throw new Error("Password is wrong.");
            }
            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;
        await usersRepository.save(user);
        return user;
    }
}

export default UpdateProfileService;
