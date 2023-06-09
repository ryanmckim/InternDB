// GET request for reviews on a company page
router.route("/company/review").get(displayReview);

// GET request for companies on main page
router.route("/company").get(displayCompanies);

module.exports = router;
