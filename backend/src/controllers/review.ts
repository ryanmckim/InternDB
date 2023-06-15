import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Review } from "../models/Review";

const reviewRepository = AppDataSource.getRepository(Review);

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = reviewRepository.create({
      ...req.body,
      salary: parseInt(req.body.salary),
      positionStartDate: new Date(req.body.positionStartDate),
      positionEndDate: new Date(req.body.positionEndDate),
    });
    await reviewRepository.save(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    if (!req.params.reviewID) {
      return res.status(404).json({ error: "Invalid review ID" });
    }
    const updatedReview = req.body;
    const review = await reviewRepository.findOneBy({
      id: parseInt(req.params.reviewID),
    });
    if (!review) {
      return res.status(400).json({ error: "Review not found" });
    }
    Object.assign(review, updatedReview);
    await reviewRepository.save(review);
    res.json(review);
  } catch {
    res.status(500).json({ error: "Failed to update review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    if (!req.params.reviewID) {
      return res.status(404).json({ error: "Invalid review ID" });
    }
    const review = await reviewRepository.findOneBy({
      id: parseInt(req.params.reviewID),
    });
    const deleteResult = await reviewRepository.delete(req.params.reviewID);
    if (deleteResult.affected === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
  } catch {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
