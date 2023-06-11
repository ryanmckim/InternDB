// POST request for review creation
router.route("/reviews").post(protect, createReview);

// GET request for reviews on main page
router.route("/reviews").get(protect, displayReview);

// GET request for reviews on profile page
router.route("/users/:id/reviews").get(protect, displayUserReview);

// PUT request for editing review
router.route("/users/:id/reviews").put(protect, editReview);

// DELETE request for deleting reviews through the profile page
router.route("reviews/:id").delete(protect, deleteReview);

module.exports = router;
