import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSessionsService from "../../../services/CreateSessionsService";

export default class SessionsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { email, password } = request.body;

            const createSession = container.resolve(CreateSessionsService);

            const user = await createSession.execute({
                email,
                password,
            });

            return response.json(user);
        } catch (err) {
            return response.status(403).json(err.message);
        }
    }
}
