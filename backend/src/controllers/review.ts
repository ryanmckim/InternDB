import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { Company } from "../models/Company";
import { Equal } from "typeorm";

export const reviewRepository = AppDataSource.getRepository(Review);
export const userRepository = AppDataSource.getRepository(User);
export const companyRepository = AppDataSource.getRepository(Company);
const reviewErrors = require("../errors/reviewErrors");

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = reviewRepository.create({
      ...req.body,
      salary: parseInt(req.body.salary),
    });
    await reviewRepository.save(review);
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    const reviewID = parseInt(req.params.reviewID);
    const updatedReview = req.body;
    const review = await reviewRepository.findOneBy({
      id: reviewID,
    });
    for (const error in reviewErrors) {
      if (reviewErrors[error](review)) {
        switch (error) {
          case "InvalidReview":
            return res.status(404).json({ error: "Review not found" });
        }
      }
    }
    Object.assign(review, updatedReview);
    await reviewRepository.save(review!);
    res.json(review);
  } catch {
    res.status(500).json({ error: "Failed to update review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewID = parseInt(req.params.reviewID);
    const review = await reviewRepository.findOneBy({
      id: reviewID,
    });
    for (const error in reviewErrors) {
      if (reviewErrors[error](review)) {
        switch (error) {
          case "InvalidReview":
            return res.status(404).json({ error: "Review not found" });
        }
      }
    }
    await reviewRepository.remove(review!);
    res.send("Review deleted successfully");
  } catch {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
