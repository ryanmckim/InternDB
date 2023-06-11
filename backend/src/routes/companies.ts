// GET request for companies on main page
router.route("/companies").get(protect, displayCompanies);

// GET request for company on individual company page
router.route("/companies/:id").get(protect, displayCompany);

// PUT request for editing company metrics
router.route("/companies/:id/salary").put(protect, updateSalary);

module.exports = router;
