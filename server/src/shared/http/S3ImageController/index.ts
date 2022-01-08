import { Request, Response } from "express";

import S3UploadService from "../S3UploadService";

export default class S3ImageController {
    public async upload(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const s3UploadService = new S3UploadService();

            const { file } = request;
            await s3UploadService.execute(file);

            return response.send();
        } catch (err) {
            return response.status(404).json(err.message);
        }
    }
}
