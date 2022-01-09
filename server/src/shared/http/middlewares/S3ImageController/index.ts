import { NextFunction, Request, Response } from "express";

import S3UploadService from "../../S3UploadService";

export default class S3ImageController {
    public async upload(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const s3UploadService = new S3UploadService();

            const { file } = request;
            await s3UploadService.execute(file);

            return next();
        } catch (err) {
            throw new Error("Problem uploading files.");
        }
    }
}
