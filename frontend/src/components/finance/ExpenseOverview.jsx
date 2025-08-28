import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

const ExpenseOverview = ({transactions,onAddExpense}) => {
  const [chartData,setChartData]=useState([]);

  useEffect(()=>{
    const result=prepareExpenseLineChartData(transactions);
    setChartData(result);

    return ()=>{};
  },[transactions]);
  
    return (
    <div className='card'>
       <div className='flex items-center justify-between'>
         <div>
            <h5 className='text-lg text-white'>Expense Overview</h5>
            <p className='text-xs text-white mt-1'>Track expenses over time and uncover valuable insights about your spending.</p>
         </div>

         <button className='add-btn' onClick={onAddExpense}>
            <LuPlus className='text-lg'/> Add Expense
         </button>
       </div>

       <div className='mt-10'>
        <CustomBarChart data={chartData}/>
       </div>
    </div>
  )
}

export default ExpenseOverview;