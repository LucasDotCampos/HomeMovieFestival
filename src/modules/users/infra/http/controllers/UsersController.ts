import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../../services/CreateUserServices";
import DeleteUsersService from "../../../services/DeleteUsersService";
import UpdateProfileService from "../../../services/UpdateProfileService";
import UserInformationService from "../../../services/UserInformationService";
import UserMoviesListService from "../../../services/UserMoviesListService";
import UsersListServices from "../../../services/UsersListServices";

export default class UsersController {
    public async userMoviesList(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { userId } = request.params;
            const listMoviesUser = container.resolve(UserMoviesListService);

            const users = await listMoviesUser.execute({ userId });

            return response.status(200).json(users);
        } catch (err) {
            return response.json(err.message);
        }
    }

    public async userById(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { userId } = request.params;
            const userInformationService = container.resolve(
                UserInformationService
            );

            const user = await userInformationService.execute({ userId });

            return response.status(200).json(user);
        } catch (err) {
            return response.json(err.message);
        }
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const createUser = container.resolve(CreateUserService);
            const user = await createUser.execute({
                name,
                email,
                password,
                avatar: "89a11137a396-profilepic.png",
            });
            console.log(user);

            delete user.password;

            return response.status(200).json(user);
        } catch (err) {
            return response.status(409).json(err.message);
        }
    }

    public async usersList(
        request: Request,
        response: Response
    ): Promise<Response> {
        const usersListServices = container.resolve(UsersListServices);

        const users = await usersListServices.execute();
        return response.json(users);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { userId } = request.params;
            const deleteUsers = container.resolve(DeleteUsersService);
            await deleteUsers.execute({ id: userId });
            return response.status(200).json("User deleted successfully");
        } catch (err) {
            return response.status(404).json(err.message);
        }
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { userId } = request.params;
            const { name, email, password, oldPassword } = request.body;

            const updateProfile = container.resolve(UpdateProfileService);

            const user = await updateProfile.execute({
                userId,
                name,
                email,
                password,
                oldPassword,
            });
            return response.json(user);
        } catch (err) {
            return response.status(400).json(err.message);
        }
    }
}
