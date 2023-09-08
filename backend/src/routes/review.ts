import { createReview, editReview, deleteReview } from "../controllers/review";
import { Router } from "express";

const router = Router();

// POST request for review creation
router.route("/").post(createReview);

// PUT request for editing review
router.route("/:reviewID").put(editReview);

// DELETE request for deleting reviews through the profile page
router.route("/:reviewID").delete(deleteReview);

module.exports = router;
