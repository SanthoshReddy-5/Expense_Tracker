import React, { useEffect, useState } from 'react';
import CustomBarChart from '../charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const RecentIncomeWithChart = ({data}) => {

    const [chartData,setChartData]=useState([]);

    useEffect(()=>{

      // prepareChartData();
      const result = prepareIncomeBarChartData(data);
      setChartData(result);

      return ()=>{};
    },[data]);

  return (
    <div className='card'>
       <div className='flex items-center justify-between'>
        <h5 className='text-lg text-white'>Last 60 Days Income</h5>
       </div>

       <CustomBarChart data={chartData}/>
    </div>
  )
}

export default RecentIncomeWithChart;