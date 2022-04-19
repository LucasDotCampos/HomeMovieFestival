import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../config/authConfig";

interface TokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("JWT Token is missing.");
    }

    const [, token] = authHeader.split(" ");

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as TokenPayload;

        request.userId = sub;

        return next();
    } catch {
        throw new Error("Invalid JWT Token.");
    }
}
