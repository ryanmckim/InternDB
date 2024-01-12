import { Request, Response } from "express";

import { companyRepository } from "../imports";
import { reviewRepository } from "../imports";
import { userRepository } from "../imports";
const companyErrors = require("../errors/companyErrors");
const reviewErrors = require("../errors/reviewErrors");
const userErrors = require("../errors/userErrors");

export const createReview = async (req: Request, res: Response) => {
  try {
    const reviewRequest = req.body.review;
    const { userId, companyId, ...reviewBody } = reviewRequest;
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });
    for (const error in userErrors) {
      switch (error) {
        case "InvalidUser":
          if (userErrors[error](user)) {
            return res.status(404).json({ error: "User not found" });
          }
      }
    }
    // Add review to company
    const company = await companyRepository.findOne({
      where: { id: companyId },
    });
    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "InvalidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }

    const review = reviewRepository.create({
      ...reviewBody,
      user,
      company,
    });
    await reviewRepository.save(review);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    for (const error in reviewErrors) {
      if (reviewErrors[error](review)) {
        switch (error) {
          case "InvalidReview":
            return res.status(404).json({ error: "Review not found" });
        }
      }
    }

    // Assign updated reviews
    Object.assign(review, req.body.review);
    await reviewRepository.save(review!);
    res.json(review);
  } catch {
    res.status(500).json({ error: "Failed to update review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const review = await reviewRepository.findOneBy({
      id: id,
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
