import React from 'react';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { addThousandsSeparator } from '../../utils/helper';

const CustomPieChart = ({ data,label,totalAmount,colors,showTextAnchor }) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie data={data} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={130} innerRadius={100} labelLine={false}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                
                {showTextAnchor && (
                    <svg>
                        <text x="50%" y="50%" dy={-25} textAnchor="middle" fill="white" fontSize="14px">{label}</text>
                        <text x="50%" y="50%" dy={8} textAnchor="middle" fill="rgb(255,82,0)" fontSize="24px" fontWeight="600">{`₹ ${addThousandsSeparator(totalAmount)}`}</text>
                    </svg>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart;