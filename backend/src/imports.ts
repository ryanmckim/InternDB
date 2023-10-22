import { AppDataSource } from "./database";
import { Company } from "./models/Company";
import { Review } from "./models/Review";
import { User } from "./models/User";
export const companyRepository = AppDataSource.getRepository(Company);
export const reviewRepository = AppDataSource.getRepository(Review);
export const userRepository = AppDataSource.getRepository(User);
