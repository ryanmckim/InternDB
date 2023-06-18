import { Equal } from "typeorm";
import { companyRepository } from "../controllers/company";

module.exports = {
  InvalidCompanyID: (companyID: number) => !isValidCompanyID(companyID),
};

const isValidCompanyID = async (companyID: number) => {
  const review = await companyRepository.find({
    where: { id: Equal(companyID) },
  });
  return !!review;
};
