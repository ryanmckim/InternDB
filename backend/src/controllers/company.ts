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
//     });
//     await companyRepository.save(company);
//     res.json(company);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create company" });
//   }
// };

export const displayCompanies = async (req: Request, res: Response) => {
  try {
    let companies = null;
    if (req.params.sort === "sortAlnum") {
      companies = await companyRepository
        .createQueryBuilder("company")
        .leftJoin("company.reviews", "review")
        .orderBy("review.name", "ASC")
        .getMany();
    } else if (req.params.sort === "sortSalary") {
      companies = await companyRepository
        .createQueryBuilder("company")
        .leftJoin("company.reviews", "review")
        .orderBy("review.salary", "ASC")
        .getMany();
    } else {
      res.status(500).json({ message: "Error sorting companies" });
    }
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving companies" });
  }
};

export const displayCompanyInfo = async (req: Request, res: Response) => {
  try {
    const company = await companyRepository.findOneBy({
      id: Equal(parseInt(req.params.companyID)),
    });
    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "InvalidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }
    if (req.params.sort == "sortMostRecent") {
      company!.reviews.sort(
        (a, b) =>
          new Date(b.positionEndDate).getTime() -
          new Date(a.positionEndDate).getTime()
      );
    } else if (req.params.sort == "sortSalary") {
      company!.reviews.sort((a, b) => a.salary - b.salary);
    } else {
      res.status(500).json({ message: "Error sorting company reviews" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
