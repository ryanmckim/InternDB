import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Equal } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../models/User";
import { Role } from "../types/roles";

const userRepository = AppDataSource.getRepository(User);

interface newJwtPayload extends JwtPayload {
  id: number;
}

// validate if you are a user
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(403).send({ message: "Not authorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as newJwtPayload;

    const user = await userRepository.findOne({
      where: {
        id: Equal(decoded.id),
      },
    });

    if (!user) {
      res.status(403).send({ message: "Not authorized" });
      return;
    }

    req.body.user = user;
    req.body.token = token;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Unable to authorize user" });
    return;
  }
};

// validate if you have the right authorization
export const validateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
  role: Role
) => {
  try {
    if (role !== req.body.user.role) {
      res.status(401).send({ message: "Not authorized" });
      return;
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Unable to validate role" });
    return;
  }
};
