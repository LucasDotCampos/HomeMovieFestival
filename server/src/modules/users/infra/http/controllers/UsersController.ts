import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserServices";
import DeleteUsersService from "../../../services/DeleteUsersService";
import ListMoviesUserService from "../../../services/ListMoviesUserService";
import ListUsersService from "../../../services/ListUsersServices";
import UpdateProfileService from "../../../services/UpdateProfileService";
import UserInformationService from "../../../services/UserInformationService";

export default class UsersController {
    public async searchById(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { userId } = request.params;
            const listMoviesUser = new ListMoviesUserService();

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
            const { id } = request.params;
            const userInformationService = new UserInformationService();

            const user = await userInformationService.execute({ id });

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

            const createUser = new CreateUserService();
            const user = await createUser.execute({
                name,
                email,
                password,
                avatar: "89a11137a396-profilepic.png",
            });

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
        const ListUsersServices = new ListUsersService();

        const users = await ListUsersServices.execute();
        return response.json(users);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { id } = request.params;
            const deleteUsers = new DeleteUsersService();
            await deleteUsers.execute({ id });
            return response.status(200).json([]);
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

            const updateProfile = new UpdateProfileService();

            const user = await updateProfile.execute({
                userId,
                name,
                email,
                password,
                oldPassword,
            });
            return response.json(user);
        } catch (err) {
            return response.status(400).json(err);
        }
    }
}
