const router = express.router();

const {
  createUser,
  displayUser,
  newPassword,
  createReview,
  displayReview,
  displayUserReview,
  deleteReview,
  editReview,
  displayCompanies,
  displayCompany,
  updateSalary,
} = require("../controllers/user.ts");

const { protect } = require("../middleware/auth.ts");
