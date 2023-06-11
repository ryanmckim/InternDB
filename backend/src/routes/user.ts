// POST request for account creation
router.route("/user").post(createUser);

// GET request for profile page
router.route("/user/:userID").get(protect, displayUser);

// PUT request for changing passsword
router.route("/user/:userID/password").put(protect, newPassword);

// GET request for reviews on a company page
router.route("/company/review").get(displayReview);

// GET request for reviews on profile page
router.route("/user/:userID/review").get(protect, displayUserReview);

module.exports = router;
