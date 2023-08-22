import { Request, Response } from "express";
import { Equal } from "typeorm";
import { Review } from "../models/Review";

import { companyRepository } from "../imports";
import { reviewRepository } from "../imports";
import { userRepository } from "../imports";
const userErrors = require("../errors/userErrors");

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = userRepository.create({
      ...req.body,
    });
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userID = parseInt(req.params.userID);
    const user = await userRepository.findOneBy({
      id: Equal(userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "InvalidUser":
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
    const userID = parseInt(req.params.userID);
    const user = await userRepository.findOneBy({
      id: Equal(userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "InvalidUser":
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
    const userID = parseInt(req.params.userID);
    const newPassword = req.body.newPassword;
    const user = await userRepository.findOneBy({
      id: userID,
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "InvalidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }

    user!.password = newPassword;
    await userRepository.save(user!);
    res.send("Password changed sucessfully");
  } catch {
    res.status(500).json({ error: "Failed to update password" });
  }
};
