import {
  displayCompanyInfo,
  displayCompanies,
  createCompany,
} from "../controllers/company";
import { Router } from "express";

const router = Router();

// Test route
router.route("/").post(createCompany);

// GET request for companies on main page
router.route("/").get(displayCompanies);

// GET request for company info on a company page
router.route("/:companyID").get(displayCompanyInfo);

module.exports = router;
