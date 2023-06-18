import { Equal } from "typeorm";
import { userRepository } from "../controllers/user";

module.exports = {
  InvalidUserID: (userID: number) => !isValidUserID(userID),
};

const isValidUserID = async (userID: number) => {
  const user = await userRepository.find({
    where: { id: Equal(userID) },
  });
  return !!user;
};
