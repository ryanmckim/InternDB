import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Company } from "../models/Company";
import { Equal } from "typeorm";

export const companyRepository = AppDataSource.getRepository(Company);
const companyErrors = require("../errors/companyErrors");

// export const createCompany = async (req: Request, res: Response) => {
//   try {
//     const company = companyRepository.create({
//       ...req.body,
//       reviews: [],
//     });
//     await companyRepository.save(company);
//     res.json(company);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create company" });
//   }
// };

export const displayCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await companyRepository.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving companies" });
  }
};

export const displayCompanyInfo = async (req: Request, res: Response) => {
  try {
    const companyID = parseInt(req.params.companyID);
    const company = await companyRepository.findOneBy({
      id: Equal(companyID),
    });
    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "isValidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
