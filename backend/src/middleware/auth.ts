import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Equal } from "typeorm";
import { PERMISSIONS } from "../constants/permissions";
import { ROLE_PERMISSIONS } from "../constants/roles";
import { userRepository, reviewRepository } from "../imports";

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
export const hasPermission =
  (permissions: PERMISSIONS[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body.user;

    req.body.permissions = [];

    for (let perm of permissions) {
      if (ROLE_PERMISSIONS.get(role)?.includes(perm)) {
        req.body.permissions.push(perm);
      }
    }

    if (req.body.permissions.length === 0) {
      res.status(403).send({ message: "You do not have the right permission" });
      return;
    }

    next();
  };

export const hasOwnReviewPerm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.body.user.id;

  if (!id) {
    if (userId === req.body.review.userId) {
      next();
      return;
    } else {
      res.status(403).send({ message: "You do not have the permission" });
      return;
    }
  }

  const ANY_PERMS = [
    PERMISSIONS.DELETE_ANY_REVIEW,
    PERMISSIONS.EDIT_ANY_REVIEW,
  ];

  if (req.body.permissions) {
    for (let perm of ANY_PERMS) {
      if (req.body.permissions.includes(perm)) {
        next();
        return;
      }
    }
  }

  try {
    const review = await reviewRepository
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .select(["review.id", "user.id"])
      .where("review.id = :id", { id })
      .getOne();

    if (review && userId !== review!.user.id) {
      res.status(403).send({ message: "You do not have the permission" });
      return;
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Unable to authorize user" });
    return;
  }
};
