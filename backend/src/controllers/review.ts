import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { Company } from "../models/Company";

export const reviewRepository = AppDataSource.getRepository(Review);
export const userRepository = AppDataSource.getRepository(User);
export const companyRepository = AppDataSource.getRepository(Company);
const reviewErrors = require("../errors/reviewErrors");
const userErrors = require("../errors/userErrors");
const companyErrors = require("../errors/companyErrors");

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = reviewRepository.create({
      ...req.body,
      salary: parseInt(req.body.salary),
    });
    await reviewRepository.save(review);

    // Add review to user
    const user = await userRepository.findOneBy({
      id: parseInt(req.body.userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "InvalidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }
    user!.reviews.push(JSON.parse(JSON.stringify(review)));
    await userRepository.save(user!);

    // Add review to company
    const company = await companyRepository.findOneBy({
      id: parseInt(req.body.companyID),
    });
    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "InvalidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    company!.reviews.push(JSON.parse(JSON.stringify(review)));
    await companyRepository.save(company!);
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    const updatedReview = {
      ...req.body,
      salary: parseInt(req.body.salary),
    };
    const review = await reviewRepository.findOneBy({
      id: parseInt(req.params.reviewID),
    });
    for (const error in reviewErrors) {
      if (reviewErrors[error](review)) {
        switch (error) {
          case "InvalidReview":
            return res.status(404).json({ error: "Review not found" });
        }
      }
    }

    // Find review for user
    const user = await userRepository.findOneBy({
      id: parseInt(req.body.userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "InvalidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }
    const userIndex = user!.reviews.findIndex(
      (index) => index.id === review!.id
    );

    // Find review for company
    const company = await companyRepository.findOneBy({
      id: parseInt(req.body.companyID),
    });
    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "InvalidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    const companyIndex = company!.reviews.findIndex(
      (index) => index.id === review!.id
    );

    // Assign updated reviews
    Object.assign(review, updatedReview);
    company!.reviews[companyIndex] = review!;
    user!.reviews[userIndex] = review!;
    await reviewRepository.save(review!);
    await userRepository.save(user!);
    await companyRepository.save(company!);
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

    // Delete review for user
    const user = await userRepository.findOneBy({
      id: parseInt(req.body.userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "InvalidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }
    const userIndex = user!.reviews.findIndex(
      (index) => index.id === review!.id
    );
    if (userIndex !== -1) {
      user!.reviews.splice(userIndex, 1);
      await userRepository.save(user!);
    } else {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete review for company
    const company = await companyRepository.findOneBy({
      id: parseInt(req.body.companyID),
    });
    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "InvalidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    const companyIndex = company!.reviews.findIndex(
      (index) => index.id === review!.id
    );
    if (companyIndex !== -1) {
      company!.reviews.splice(companyIndex, 1);
      await companyRepository.save(company!);
    } else {
      return res.status(404).json({ error: "Review not found" });
    }

    await reviewRepository.remove(review!);
    res.send("Review deleted successfully");
  } catch {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
