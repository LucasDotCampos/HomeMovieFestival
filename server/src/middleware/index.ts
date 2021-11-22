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
    console.log("rota nao autorizada");
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, `${secret}`);
    const { id } = data as Token;
    request.userId = id;

    return next();
  } catch {
    return response.sendStatus(401).json("token is invalid");
  }
}
