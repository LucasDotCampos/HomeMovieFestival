import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import CreateSessionsService from "../services/CreateSessionsService";
import UserEntity from "../typeorm/entities/UserEntity";


export default class SessionsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response | UserEntity> {
        try {
            const { email, password } = request.body;

            const createSession = new CreateSessionsService();

            const user = await createSession.execute({
                email,
                password,
            });

            console.log(user);
            

            return response.json(user);
        } catch (err) {
            return response.json(err.message);
        }
    }
}
