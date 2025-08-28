const express = require('express');
const {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel} = require('../controllers/expenseController');
const {protect}=require('../middleware/authMiddleware');
const router = express.Router();

router.post('/AddExpense', protect, addExpense);
router.get('/GetAllExpense', protect, getAllExpense);
router.get('/DownloadExpenseExcel', protect, downloadExpenseExcel);
router.delete('/:id', protect, deleteExpense);

module.exports = router;