import { User } from "../models/User";

module.exports = {
  InvalidUser: (user: User) => !isValidUser(user),
};

const isValidUser = async (user: User) => {
  return !user;
};
