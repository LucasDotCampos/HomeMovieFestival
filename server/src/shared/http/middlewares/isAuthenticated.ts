import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import authConfig from "../../../config/authConfig";

interface TokenPayload {
  id: string;
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
    throw new AppError("JWT Token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { id } = decodedToken as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    throw new AppError("Invalid JWT Token.");
  }
}
