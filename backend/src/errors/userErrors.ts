import { pwdRe } from "../constants/regex";
import { User } from "../models/User";

module.exports = {
  InvalidUser: (user: User) => !isValidUser(user),
  InvalidPwd: (pwd: string) => !isValidPwd(pwd),
};

const isValidUser = (user: User) => {
  return !!user;
};

const isValidPwd = (pwd: string) => {
  return pwdRe.test(pwd);
};
