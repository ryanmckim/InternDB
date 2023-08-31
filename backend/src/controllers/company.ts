import { Request, Response } from "express";
import { Equal } from "typeorm";
import { Review } from "../models/Review";

import { companyRepository } from "../imports";
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
    const updatedCompanies = companies.map((company) => ({
      id: company.id,
      name: company.name,
      numOfReviews: company.reviews.length,
    }));
    res.json(updatedCompanies);
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
    let sortedReviews;

    if (req.query.sort === "mostRecent") {
      sortedReviews = JSON.parse(
        JSON.stringify(
          company!.reviews.sort(
            (a: Review, b: Review) =>
              new Date(b.positionEndDate).getTime() -
              new Date(a.positionEndDate).getTime()
          )
        )
      );
    } else if (req.query.sort === "leastRecent") {
      sortedReviews = JSON.parse(
        JSON.stringify(
          company!.reviews.sort(
            (a: Review, b: Review) =>
              new Date(a.positionEndDate).getTime() -
              new Date(b.positionEndDate).getTime()
          )
        )
      );
    } else if (req.query.sort === "highestSalary") {
      sortedReviews = JSON.parse(
        JSON.stringify(
          company!.reviews.sort((a: Review, b: Review) => b.salary - a.salary)
        )
      );
    } else if (req.query.sort === "lowestSalary") {
      sortedReviews = JSON.parse(
        JSON.stringify(
          company!.reviews.sort((a: Review, b: Review) => a.salary - b.salary)
        )
      );
    } else {
      res.status(500).json({ message: "Query missing" });
    }
    function calculateAverageSalary(reviews: Review[]) {
      const totalSalary = reviews.reduce(
        (sum: number, review: Review) => sum + review.salary,
        0
      );
      const numOfReviews = reviews.length;
      const avgSalary = Math.round((totalSalary / numOfReviews) * 100) / 100;
      return [avgSalary, numOfReviews];
    }
    function updateCompanyByCurrency(reviews: Review[], currency: string) {
      const updatedReview = reviews.filter((review) => {
        return review.currency === currency;
      });
      const reviewInfo = calculateAverageSalary(updatedReview);
      const avgSalary = reviewInfo[0];
      const numOfReviews = reviewInfo[1];
      return {
        ...company,
        reviews: updatedReview,
        avgSalary,
        numOfReviews,
      };
    }
    const updatedCompany = updateCompanyByCurrency(
      sortedReviews!,
      req.query.currency as string
    );
    res.json(updatedCompany);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
