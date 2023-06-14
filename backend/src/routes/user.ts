import { Router } from "express";
import { protect } from "../middleware/auth";

import {
  getUserById,
  updatePassword,
  getReviewsByUserId,
} from "../controllers/user";

const router = Router();

// GET request for profile page
router.route("/:userID").get(protect, getUserById);

// PUT request for changing passsword
router.route("/:userID/password").put(protect, updatePassword);

// GET request for reviews on profile page
router.route("/:userID/review").get(protect, getReviewsByUserId);

module.exports = router;
