import { Router } from "express";
import { protect } from "../controllers/auth";
import { createReview, editReview, deleteReview } from "../controllers/review";

const router = Router();

// POST request for review creation
router.route("/review").post(protect, createReview);

// PUT request for editing review
router.route("/review/:reviewID").put(protect, editReview);

// DELETE request for deleting reviews through the profile page
router.route("/review/:reviewID").delete(protect, deleteReview);

module.exports = router;
