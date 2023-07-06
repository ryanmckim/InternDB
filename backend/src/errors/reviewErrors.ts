import { Review } from "../models/Review";
import { User } from "../models/User";
import { Company } from "../models/Company";

module.exports = {
  InvalidUser: (user: User) => !isValidUser(user),
};

const isValidUser = (user: User) => {
  return !!user;
};

module.exports = {
  InvalidReviewID: (review: Review) => !isValidReviewID(review),
  InvalidUserID: (user: User) => !isValidUserID(user),
  InvalidCompanyName: (company: Company) => !isValidCompanyName(company),
};

const isValidReviewID = (review: Review) => {
  return !!review;
};

const isValidUserID = (user: User) => {
  return !!user;
};

const isValidCompanyName = (company: Company) => {
  return !!company;
};
