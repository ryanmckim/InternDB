// POST request for account creation
router.route("/user").post(protect, createUser);

// GET request for profile page
router.route("/user/:id").get(protect, displayUser);

// PUT request for changing passsword
router.route("/user/:id").put(protect, newPassword);

module.exports = router;
