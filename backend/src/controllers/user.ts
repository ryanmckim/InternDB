import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../models/User";
import { Equal } from "typeorm";
import { Review } from "../models/Review";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  try {
    const review = userRepository.create({
      ...req.body,
    });
    await userRepository.save(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const displayUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.find({
      where: { id: Equal(parseInt(req.params.userID)) },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to display user details" });
  }
};

export const newPassword = async (req: Request, res: Response) => {
  try {
    if (!req.params.userID) {
      return res.status(404).json({ error: "Invalid user ID" });
    }
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.userID),
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.password === req.params.password) {
      return res.status(400).json({
        error: "New password must be different from the current password",
      });
    }
    user.password = req.params.password;
    await userRepository.save(user);
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const displayUserReview = async (req: Request, res: Response) => {
  try {
    if (!req.params.userID) {
      return res.status(404).json({ error: "Invalid user ID" });
    }
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.userID),
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (!user.reviews) {
      res.status(500).json({ message: "No reviews yet" });
    }
    res.json(user.reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to display reviews" });
  }
};
