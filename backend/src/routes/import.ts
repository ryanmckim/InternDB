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
} = require("../controllers/user.ts");

const { protect } = require("../middleware/auth.ts");
