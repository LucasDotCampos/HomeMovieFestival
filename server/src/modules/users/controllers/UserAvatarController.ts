import { Request, response, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const updateAvatar = new UpdateUserAvatarService();

            const user = updateAvatar.execute({
                userId: request.userId,
                avatarFilename: request.file?.filename,
            });
            return response.status(200).json(user);
        } catch (err) {
            return response.status(404).json(err.message);
        }
    }
}
