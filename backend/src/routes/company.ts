import { displayCompanyInfo, displayCompanies } from "../controllers/company";
import { Router } from "express";

const router = Router();

// GET request for companies on main page
router.route("/sort").get(displayCompanies);

// GET request for company info on a company page
router.route("/:companyID/sort").get(displayCompanyInfo);

module.exports = router;
