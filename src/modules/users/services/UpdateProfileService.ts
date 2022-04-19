import { inject, injectable } from "tsyringe";
import { IUser, IUserUpdate } from "../domain/models";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class UpdateProfileService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}
    public async execute({
        userId,
        name,
        email,
        password,
        oldPassword,
    }: IUserUpdate): Promise<IUser> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new Error("User not found.");
        }

        const userUpdateEmail = await this.usersRepository.findByemail(email);

        if (userUpdateEmail && userUpdateEmail.id !== userId) {
            throw new Error("This email already belongs to another user");
        }

        if (password && !oldPassword) {
            throw new Error("Old password is missing");
        }

        if (password && oldPassword) {
            const checkOldPassword = await this.hashProvider.compareHash(
                oldPassword,
                user.password
            );
            if (!checkOldPassword) {
                throw new Error("Password is wrong.");
            }
            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;
        await this.usersRepository.save(user);
        return user;
    }
}

export default UpdateProfileService;
