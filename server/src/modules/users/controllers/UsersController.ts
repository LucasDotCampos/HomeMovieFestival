import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserServices";
import ListUsersService from "../services/ListUsersServices";
import ListMoviesUserService from "../services/ListMoviesUserService";
import DeleteUsersService from "../services/DeleteUsersService";
import UserInformationService from "../services/UserInformationService";
import UpdateProfileService from "../services/UpdateProfileService";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

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
                avatar: "profilepic.png",
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
        try {
            const ListUsersServices = new ListUsersService();

            const users = await ListUsersServices.execute();
            return response.json(users);
        } catch (err) {
            return response.json(err.message);
        }
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
            return response.status(424).json(err.message);
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
            return response.json(err.message);
        }
    }
}
