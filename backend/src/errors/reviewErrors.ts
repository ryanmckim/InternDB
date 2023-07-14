import { Review } from "../models/Review";

module.exports = {
  InvalidReview: (review: Review) => !isValidReview(review),
};

const isValidReview = (review: Review) => {
  return !!review;
};
