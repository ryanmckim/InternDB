// POST request for account creation
router.route("/users").post(protect, createUser);

// GET request for profile page
router.route("/users/:id").get(protect, displayUser);

// PUT request for changing passsword
router.route("/users/:id/password").put(protect, newPassword);

module.exports = router;
