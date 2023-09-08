import { User } from "../models/User";

module.exports = {
  InvalidUser: (user: User) => !isValidUser(user),
};

const isValidUser = (user: User) => {
  return !!user;
};
