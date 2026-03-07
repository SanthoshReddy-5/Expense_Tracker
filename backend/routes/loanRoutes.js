const express = require("express");
const { addLoan, getAllLoans, updateLoan, deleteLoan } = require("../controllers/loanController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/AddLoan", protect, addLoan);
router.get("/GetAllLoans", protect, getAllLoans);
router.put("/:id", protect, updateLoan);
router.delete("/:id", protect, deleteLoan);

module.exports = router;
