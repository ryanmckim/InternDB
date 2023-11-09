import { Request, Response } from "express";
import { Equal, UpdateDateColumn } from "typeorm";
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
    const companies = await companyRepository
      .createQueryBuilder("company")
      .leftJoin("company.reviews", "reviews")
      .select("company.id", "id")
      .addSelect("company.name", "name")
      .addSelect("COUNT(reviews.id)", "numOfReviews")
      .groupBy("company.id")
      .getRawMany();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving companies" });
  }
};

export const displayCompanyInfo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { currency, sort } = req.query;

    const company = await companyRepository
      .createQueryBuilder("company")
      .where("company.id = :id", { id })
      .getOne();

    let reviewsQuery = await companyRepository
      .createQueryBuilder("company")
      .leftJoinAndSelect("company.reviews", "reviews")
      .where("company.id = :id", { id })
      .andWhere("reviews.currency = :currency", { currency });

    const companyInfo = await companyRepository
      .createQueryBuilder("company")
      .leftJoin("company.reviews", "reviews")
      .select("company.id", "id")
      .addSelect("COUNT(reviews.id)", "numOfReviews")
      .addSelect("AVG(reviews.salary)", "avgSalary")
      .where("company.id = :id", { id })
      .andWhere("reviews.currency = :currency", { currency })
      .groupBy("company.id")
      .getRawOne();

    for (const error in companyErrors) {
      if (companyErrors[error](company)) {
        switch (error) {
          case "InvalidCompany":
            return res.status(404).json({ error: "Company not found" });
        }
      }
    }

    switch (sort) {
      case "mostRecent":
        reviewsQuery = reviewsQuery.orderBy("reviews.positionEndDate", "DESC");
        break;
      case "leastRecent":
        reviewsQuery = reviewsQuery.orderBy("reviews.positionEndDate", "ASC");
        break;
      case "highestSalary":
        reviewsQuery = reviewsQuery.orderBy("reviews.salary", "DESC");
        break;
      case "lowestSalary":
        reviewsQuery = reviewsQuery.orderBy("reviews.salary", "ASC");
        break;
      default:
        return res.status(500).json({ message: "Query missing or incorrect" });
    }

    const reviewResponse = await reviewsQuery.getOne();
    const numOfReviews = companyInfo ? companyInfo.numOfReviews : 0;
    const avgSalary = companyInfo ? companyInfo.avgSalary : null;
    const reviews = reviewResponse ? reviewResponse.reviews : [];

    const companyResponse = {
      ...company,
      numOfReviews,
      avgSalary,
      reviews,
    };
    res.json(companyResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};
