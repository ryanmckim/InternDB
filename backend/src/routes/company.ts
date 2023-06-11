// GET request for companies on main page
router.route("/company").get(protect, displayCompanies);

// GET request for company on individual company page
router.route("/company/:id").get(protect, displayCompany);

// PUT request for editing company metrics
router.route("/company/:id").put(protect, updateSalary);

module.exports = router;
