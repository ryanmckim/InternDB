import { createReview, editReview, deleteReview } from "../controllers/review";
import { Router } from "express";
import { protect, hasPermission, hasOwnReviewPerm } from "../middleware/auth";
import { PERMISSIONS } from "../constants/permissions";

const router = Router();

router.use(protect);

// POST request for review creation
router
  .route("/")
  .post(
    hasPermission([PERMISSIONS.CREATE_OWN_REVIEW]),
    hasOwnReviewPerm,
    createReview
  );

// PUT request for editing review
router
  .route("/:id")
  .put(
    hasPermission([PERMISSIONS.EDIT_OWN_REVIEW, PERMISSIONS.EDIT_ANY_REVIEW]),
    hasOwnReviewPerm,
    editReview
  );

// DELETE request for deleting reviews through the profile page
router
  .route("/:id")
  .delete(
    hasPermission([
      PERMISSIONS.DELETE_OWN_REVIEW,
      PERMISSIONS.DELETE_ANY_REVIEW,
    ]),
    hasOwnReviewPerm,
    deleteReview
  );

module.exports = router;
