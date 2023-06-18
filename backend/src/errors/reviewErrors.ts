import { Equal } from "typeorm";
import { reviewRepository } from "../controllers/review";

module.exports = {
  InvalidReviewID: (reviewID: number) => !isValidReviewID(reviewID),
  InvalidUserID: (userID: number) => !isValidUserID(userID),
  InvalidCompanyName: (companyName: string) => !isValidCompanyName(companyName),
};

const isValidReviewID = async (reviewID: number) => {
  const review = await reviewRepository.find({
    where: { id: Equal(reviewID) },
  });
  return !!review;
};

const isValidUserID = async (userID: number) => {
  const review = await reviewRepository.find({
    where: { userID: Equal(userID) },
  });
  return !!review;
};

const isValidCompanyName = async (companyName: string) => {
  const company = await reviewRepository.find({
    where: { company: Equal(companyName) },
  });
};
