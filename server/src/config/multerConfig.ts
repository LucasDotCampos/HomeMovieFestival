import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
    directory: path.resolve(__dirname, "..", "..", "uploads"),
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "..", "uploads"));
        },
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString("hex");
            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (request: any, file: any, callback: any) => {
        const mimetypes = ["image/jpeg", "jtif", "image/png", "image/gif"];
        if (!mimetypes.includes(file.mimetypes)) {
            callback(null, true);
        } else {
            callback(new Error("This format is invalid"));
        }
    },
};
