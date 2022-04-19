import S3Storage from "../S3Storage";

class S3UploadService {
    async execute(file: Express.Multer.File): Promise<void> {
        const s3Storage = new S3Storage();

        await s3Storage.saveFile(file.filename);
    }
}

export default S3UploadService;
