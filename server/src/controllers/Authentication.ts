import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Users from "../models/Users";
import routes from "../routes";

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const secret = process.env.SECRET;
    const repository = getRepository(Users);
    const { email, username, password } = request.body;

    const user = await repository.findOne({ where: { email, username } });
    if (!user) {
      return response.sendStatus(401).json({ msg: "Not Authorized routes" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401).json({ msg: "invalid password" });
    }
    const token = jwt.sign({ id: user.id }, `${secret}`, { expiresIn: "1d" });

    delete user.password;

    return response.json({
      user,
      token,
    });
  }
}

export default new AuthenticationController();
