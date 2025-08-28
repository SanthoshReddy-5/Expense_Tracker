import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { addThousandsSeparator } from '../../utils/helper';

const CustomBarChart = ({ data }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-sm font-semibold text-primary mb-1'>{payload[0].payload.category || payload[0].payload.source}</p>
          <p className='text-sm font-semibold'>{`₹ ${addThousandsSeparator(payload[0].payload.amount)}`}</p>
        </div>
      )
    }
    return null;
  };

  return (
    <div className='mt-6'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "white" }} stroke="#fff" />
          <YAxis tick={{ fontSize: 12, fill: "white" }} stroke="#fff" />

          <Tooltip content={<CustomTooltip/>} cursor={{fill:"transparent"}} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="rgb(255,82,0)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart;