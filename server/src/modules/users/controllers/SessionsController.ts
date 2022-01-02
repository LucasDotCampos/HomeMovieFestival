import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";

export default class SessionsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { email, password } = request.body;

            const createSession = new CreateSessionsService();

            const user = await createSession.execute({
                email,
                password,
            });

            response.status(400).json({
                message: "Login Failed",
                status: response.statusCode,
            });

            return response.json(user);
        } catch (err) {
            return response.json(err.message);
        }
    }
}
