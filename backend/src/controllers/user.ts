import { Request, Response } from "express";
import { Equal } from "typeorm";
import { Review } from "../models/Review";

import { companyRepository } from "../imports";
import { reviewRepository } from "../imports";
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
    const user = await userRepository.findOneBy({
      id: Equal(parseInt(req.params.id)),
    });
    for (const error in userErrors) {
      switch (error) {
        case "InvalidUser":
          if (userErrors[error](user)) {
            return res.status(404).json({ error: "User not found" });
          }
      }
    }

    const reviews = user!.reviews;
    if (reviews.length > 0) {
      for (const review of reviews!) {
        const company = await companyRepository.findOneBy({
          id: Equal(review.companyID),
        });
        company!.reviews = company!.reviews.filter(
          (r: Review) => r.id !== review.id
        );
        await companyRepository.save(company!);
        await reviewRepository.remove(review!);
      }
    }

    await userRepository.remove(user!);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

export const displayUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: Equal(parseInt(req.params.id)),
    });
    for (const error in userErrors) {
      switch (error) {
        case "InvalidUser":
          if (userErrors[error](user)) {
            return res.status(404).json({ error: "User not found" });
          }
      }
    }
    user!.reviews.sort(
      (a: Review, b: Review) =>
        new Date(b.positionEndDate).getTime() -
        new Date(a.positionEndDate).getTime()
    );
    res.json(user);
  } catch (error) {
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
  } catch {
    res.status(500).json({ error: "Failed to update password" });
  }
};
