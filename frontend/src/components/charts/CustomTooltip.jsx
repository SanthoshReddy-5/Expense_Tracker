import React from 'react';
import { addThousandsSeparator } from '../../utils/helper';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                <p className='text-sm font-semibold text-primary mb-1'>{payload[0].name}</p>
                <p className='text-sm font-semibold'>{`₹ ${addThousandsSeparator(payload[0].value)}`}</p>
            </div>
        )
    }
    return null;
}

export default CustomTooltip;