import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../models/User";
import { emailRe, pwdRe } from "../constants/regex";
import { Equal } from "typeorm";
import sendEmail from "../utils/sendEmail";
import jwt, { JwtPayload } from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

interface newJwtPayload extends JwtPayload {
  id: number;
  email: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Please provide email and password" });
    return;
  }

  try {
    let user = await userRepository.findOne({
      where: {
        email: Equal(email),
      },
    });

    if (user) {
      res
        .status(400)
        .send({ message: "User with the given email already exist" });
      return;
    }

    if (!emailRe.test(email) || !pwdRe.test(password)) {
      res
        .status(400)
        .send({ message: "Email or password does not meet the requirements" });
      return;
    }

    user = userRepository.create({
      email,
      password,
    });

    await userRepository.save(user);

    const token = user.getVerificationToken();

    const verifyUrl = `${process.env.FE_URL}/verify/${token}`;
    const message = `
      <p>Please verify your email by clicking the below link:</p>
      <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
    `;

    await sendEmail({
      to: email,
      subject: "Please verify your email account",
      text: message,
    });

    res.status(200).send({ message: "Email verification sent" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Unable to register user" });
    return;
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const token = req.params.token;

  if (!token) {
    res.status(401).send({ message: "Invalid token" });
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
      res.status(404).send({ message: "User not found" });
      return;
    }

    if (user.email !== decoded.email) {
      res.status(401).send({ message: "Invalid verification" });
      return;
    }

    user.verified = true;
    await userRepository.save(user);

    res.status(201).send({
      message: "Email verified",
      response: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Verification failed" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Please provide email and password" });
    return;
  }

  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    if (!user.verified) {
      res.status(403).send({ message: "User not verified" });
      return;
    }

    if (!user.matchPassword(password)) {
      res.status(401).send({ message: "Password incorrect" });
      return;
    }

    sendToken(user, 200, res);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Unable to login" });
    return;
  }
};

// export const forgotPassword = () => {};

// export const resetPassword = () => {};

const sendToken = (user: User, statusCode: number, res: Response) => {
  const token = user.getSignedToken();
  res.status(statusCode).send({ token });
};
