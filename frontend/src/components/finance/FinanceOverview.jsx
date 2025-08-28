import React from 'react';
import CustomPieChart from '../charts/CustomPieChart';

const COLORS=["#08CB00","#3FA2F6","#FF0B55"];

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData=[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense}
    ];
    
    return (
    <div className='card'>
       <div className='flex items-center justify-between'>
        <h5 className='text-lg text-white'>Financial Overview</h5>
       </div>

       <CustomPieChart data={balanceData} label="Total Balance" totalAmount={totalBalance} colors={COLORS} showTextAnchor />
    </div>
  )
}

export default FinanceOverview;