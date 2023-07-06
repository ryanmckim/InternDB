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
    const userID = parseInt(req.body.userID);
    const user = await userRepository.findOneBy({
      id: Equal(userID),
    });
    const companyName = req.body.company;
    const company = await companyRepository.findOneBy({
      name: Equal(companyName),
    });
    for (const error in reviewErrors) {
      if (reviewErrors[error](user, company)) {
        switch (error) {
          case "isValidUserID":
            return res.status(404).json({ error: "User not found" });
          case "isValidCompanyName":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    const review = reviewRepository.create({
      ...req.body,
      salary: parseInt(req.body.salary),
      positionStartDate: new Date(req.body.positionStartDate),
      positionEndDate: new Date(req.body.positionEndDate),
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
    const userID = parseInt(req.body.userID);
    const company = req.body.company;
    for (const error in reviewErrors) {
      if (reviewErrors[error](reviewID, userID, company)) {
        switch (error) {
          case "isValidReviewID":
            return res.status(404).json({ error: "Review not found" });
          case "isValidUserID":
            return res.status(404).json({ error: "User not found" });
          case "isValidCompanyName":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    const updatedReview = req.body;
    const review = await reviewRepository.findOneBy({
      id: reviewID,
    });
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
    const userID = parseInt(req.body.userID);
    const company = req.body.company;
    for (const error in reviewErrors) {
      if (reviewErrors[error](reviewID, userID, company)) {
        switch (error) {
          case "isValidReviewID":
            return res.status(404).json({ error: "Review not found" });
          case "isValidUserID":
            return res.status(404).json({ error: "User not found" });
          case "isValidCompanyName":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    const review = await reviewRepository.findOneBy({
      id: reviewID,
    });
    await reviewRepository.remove(review!);
  } catch {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
