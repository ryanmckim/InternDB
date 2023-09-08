import { Request, Response } from "express";

import { companyRepository } from "../imports";
import { reviewRepository } from "../imports";
import { userRepository } from "../imports";
const companyErrors = require("../errors/companyErrors");
const reviewErrors = require("../errors/reviewErrors");
const userErrors = require("../errors/userErrors");

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = reviewRepository.create({
      ...req.body,
      userID: parseInt(req.body.userID),
      companyID: parseInt(req.body.companyID),
    });
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
    await reviewRepository.save(review);
    user!.reviews.push(JSON.parse(JSON.stringify(review)));
    company!.reviews.push(JSON.parse(JSON.stringify(review)));
    await userRepository.save(user!);
    await companyRepository.save(company!);
    res.json(review);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
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
      id: review!.userID,
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
      (review) => review.id === review!.id
    );

    // Find review for company
    const company = await companyRepository.findOneBy({
      id: review!.companyID,
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
      (review) => review.id === review!.id
    );
    
    // Assign updated reviews
    Object.assign(review, req.body);
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
      id: review!.userID,
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
      (review) => review.id === reviewID
    );
    if (userIndex !== -1) {
      user!.reviews.splice(userIndex, 1);
      await userRepository.save(user!);
    } else {
      return res.status(404).json({ error: "Review not found" });
    }
    // Delete review for company
    const company = await companyRepository.findOneBy({
      id: review!.companyID,
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
      (review) => review.id === reviewID
    );

    if (companyIndex !== -1) {
      company!.reviews.splice(companyIndex, 1);
      await companyRepository.save(company!);
    } else {
      return res.status(404).json({ error: "Review not found" });
    }

    await reviewRepository.remove(review!);
    res.send("Review deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
