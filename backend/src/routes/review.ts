// POST request for review creation
router.route("/review").post(protect, createReview);

// GET request for reviews on main page
router.route("/review").get(protect, displayReview);

// GET request for reviews on profile page
router.route("/review").get(protect, displayUserReview);

// PUT request for editing review
router.route("/review/:id").put(protect, editReview);

// DELETE request for deleting reviews through the profile page
router.route("review/:id").delete(protect, deleteReview);

module.exports = router;
