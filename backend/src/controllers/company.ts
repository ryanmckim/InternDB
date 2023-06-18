import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Company } from "../models/Company";
import { Equal } from "typeorm";

export const companyRepository = AppDataSource.getRepository(Company);
const companyErrors = require("../errors/companyErrors");

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
    for (const error in companyErrors) {
      if (companyErrors[error](companyID)) {
        switch (error) {
          case "isValidCompanyID":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    const company = await companyRepository.find({
      where: { id: Equal(companyID) },
    });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
