import { Request, Response } from "express";
import { Company } from "../models/Company";
import { Equal } from "typeorm";
import { Review } from "../models/Review";

import { companyRepository } from "../imports";
const companyErrors = require("../errors/companyErrors");

export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = companyRepository.create({
      ...req.body,
    });
    await companyRepository.save(company);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Failed to create company" });
  }
};

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
    let sortedCompany: Company;

    if (req.query.sort === "sortMostRecent") {
      sortedCompany = JSON.parse(
        JSON.stringify(
          company!.reviews.sort(
            (a: Review, b: Review) =>
              new Date(b.positionEndDate).getTime() -
              new Date(a.positionEndDate).getTime()
          )
        )
      );
    } else if (req.query.sort === "sortLeastRecent") {
      sortedCompany = JSON.parse(
        JSON.stringify(
          company!.reviews.sort(
            (a: Review, b: Review) =>
              new Date(a.positionEndDate).getTime() -
              new Date(b.positionEndDate).getTime()
          )
        )
      );
    } else if (req.query.sort === "sortHighestSalary") {
      sortedCompany = JSON.parse(
        JSON.stringify(
          company!.reviews.sort((a: Review, b: Review) => a.salary - b.salary)
        )
      );
    } else if (req.query.sort === "sortLowestSalary") {
      sortedCompany = JSON.parse(
        JSON.stringify(
          company!.reviews.sort((a: Review, b: Review) => b.salary - a.salary)
        )
      );
    } else {
      res.status(500).json({ message: "Query missing" });
    }
    let updatedCompany;
    function calculateAverageSalary(reviews: Review[]) {
      const totalSalary = reviews.reduce(
        (sum: number, review: Review) => sum + review.salary,
        0
      );
      const numOfReviews = reviews.length;
      const avgSalary = Math.round((totalSalary / numOfReviews) * 100) / 100;
      return [avgSalary, numOfReviews];
    }
    function updateCompanyByCurrency(company: Company, currency: string) {
      if (currency === "both") {
        return company;
      } else {
        const updatedCompany = company.reviews.filter((review) => {
          return review.currency === currency;
        });
        const reviewInfo = calculateAverageSalary(updatedCompany);
        const avgSalary = reviewInfo[0];
        const numOfReviews = reviewInfo[1];
        return {
          ...updatedCompany,
          avgSalary: avgSalary,
          numOfReviews: numOfReviews,
        };
      }
    }
    if (req.query.currency === "CAD") {
      updatedCompany = updateCompanyByCurrency(sortedCompany!, "CAD");
    } else if (req.query.currency === "USD") {
      updatedCompany = updateCompanyByCurrency(sortedCompany!, "USD");
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
