import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Company } from "../models/Company";
import { Equal } from "typeorm";

const companyRepository = AppDataSource.getRepository(Company);

export const displayReviews = async (req: Request, res: Response) => {
  try {
    const companyReviews = await companyRepository.find({
      where: { name: Equal(req.params.name) },
    });
    res.json(companyReviews);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving company reviews" });
  }
};

export const displayCompanies = async (req: Request, res: Response) => {
  try {
    res.json(companyRepository);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving companies" });
  }
};
