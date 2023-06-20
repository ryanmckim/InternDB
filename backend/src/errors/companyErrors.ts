import { Company } from "../models/Company";

module.exports = {
  InvalidCompany: (company: Company) => !isValidCompany(company),
};

const isValidCompany = async (company: Company) => {
  return !company;
};
