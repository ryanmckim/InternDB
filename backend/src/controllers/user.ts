import { Request, Response } from "express";
import { userRepository } from "../imports";
const userErrors = require("../errors/userErrors");

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const user = userRepository.create({
//       ...req.body,
//     });
//     await userRepository.save(user);
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// };

export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: "Missing id" });
    }
    await userRepository.delete(req.params.id);
    res.send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete account" });
  }
};

export const displayUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.reviews", "review")
      .leftJoinAndSelect("review.company", "company")
      .where("user.id = :id", { id })
      .orderBy("review.positionEndDate", "DESC")
      .getOne();

    for (const error in userErrors) {
      switch (error) {
        case "InvalidUser":
          if (userErrors[error](user)) {
            return res.status(404).json({ error: "User not found" });
          }
      }
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to display user details" });
  }
};

export const newPassword = async (req: Request, res: Response) => {
  try {
    const newPassword = req.body.newPassword;
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    for (const error in userErrors) {
      switch (error) {
        case "InvalidUser":
          if (userErrors[error](user)) {
            return res.status(404).json({ error: "User not found" });
          }
        case "InvalidPwd":
          if (userErrors[error](newPassword)) {
            return res.status(400).json({ error: "Invalid password" });
          }
      }
    }

    if (user!.matchPassword(newPassword)) {
      return res.status(400).json({ error: "Password is same as before" });
    }

    user!.password = newPassword;
    user!.hashPassword();
    await userRepository.save(user!);
    res.send("Password changed sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update password" });
  }
};
