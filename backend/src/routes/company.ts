import { displayReviews, displayCompanies } from "../controllers/company";
import { Router } from "express";

const router = Router();

// GET request for reviews on a company page
router.route("/:name/review").get(displayReviews);

// GET request for companies on main page
router.route("/").get(displayCompanies);

module.exports = router;
