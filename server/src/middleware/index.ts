import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Token {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const secret = process.env.SECRET;
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    console.log("rota autorizada");
    const data = jwt.verify(token, `${secret}`);
    const { id } = data as Token;
    request.userId = id;

    return next();
  } catch {
    console.log("não autorizado");
    return response.sendStatus(401);
  }
}
