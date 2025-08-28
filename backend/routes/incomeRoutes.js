const express=require('express');

const {addIncome,getAllIncome,deleteIncome,downloadIncomeExcel}=require('../controllers/incomeController');
const {protect}=require('../middleware/authMiddleware');

const router=express.Router();

router.post('/AddIncome',protect,addIncome);
router.get('/GetAllIncome',protect,getAllIncome);
router.get('/DownloadIncomeExcel',protect,downloadIncomeExcel);
router.delete('/:id',protect,deleteIncome);

module.exports=router;