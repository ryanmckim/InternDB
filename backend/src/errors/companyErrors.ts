import { Company } from "../models/Company";

module.exports = {
  InvalidCompany: (company: Company) => !isValidCompany(company),
};

const isValidCompany = (company: Company) => {
  return !!company;
};
