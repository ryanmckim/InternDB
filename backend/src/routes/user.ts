import {
  createUser,
  displayUser,
  newPassword,
  displayUserReview,
} from "../controllers/user";
import { Router } from "express";

const router = Router();

// POST request for account creation
router.route("/").post(createUser);

// GET request for profile page
router.route("/:userID").get(protect, displayUser);

// PUT request for changing password
router.route("/:userID/password").put(protect, newPassword);

// GET request for reviews on profile page
router.route("/:userID").get(protect, displayUserReview);

module.exports = router;
