import { createReview, editReview, deleteReview } from "../controllers/review";
import { Router } from "express";

const router = Router();

// POST request for review creation
router.route("/").post(protect, createReview);

// PUT request for editing review
router.route("/:reviewID").put(protect, editReview);

// DELETE request for deleting reviews through the profile page
router.route("/:reviewID").delete(protect, deleteReview);

module.exports = router;
