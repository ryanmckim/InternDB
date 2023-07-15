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
    const companies = await companyRepository.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving companies" });
  }
};

export const displayCompanyInfo = async (req: Request, res: Response) => {
  try {
    let company = await companyRepository.findOneBy({
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
    if (req.body.sort == "sortMostRecent") {
      company!.reviews.sort(
        (a, b) =>
          new Date(b.positionEndDate).getTime() -
          new Date(a.positionEndDate).getTime()
      );
    } else if (req.body.sort == "sortSalary") {
      company!.reviews.sort((a, b) => a.salary - b.salary);
    } else {
      res.status(500).json({ message: "Error sorting company reviews" });
    }
    let updatedCompany = null;
    if (req.body.currency === "both") {
      updatedCompany = company;
    } else if (req.body.currency === "CAD") {
      company!.reviews.filter((review) => {
        return review.currency === "CAD";
      });
      const totalSalary = company!.reviews.reduce((sum, review) => {
        return sum + review.salary;
      }, 0);
      const numOfReviews = company!.reviews.length;
      const avgSalary = Math.round((totalSalary / numOfReviews) * 100) / 100;
      updatedCompany = {
        ...company,
        avgSalary: avgSalary,
      };
    } else if (req.body.currency === "USD") {
      updatedCompany = company!.reviews.filter((review) => {
        return review.currency === "USD";
      });
      const totalSalary = company!.reviews.reduce((sum, review) => {
        return sum + review.salary;
      }, 0);
      const numOfReviews = company!.reviews.length;
      const avgSalary = Math.round((totalSalary / numOfReviews) * 100) / 100;
      updatedCompany = {
        ...company,
        avgSalary: avgSalary,
      };
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
