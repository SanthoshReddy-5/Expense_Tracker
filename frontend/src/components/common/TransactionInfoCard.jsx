import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPencil } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper';

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit }) => {

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg border border-transparent cursor-pointer hover:border-slate-700 bg-black hover:bg-gray-900 transition-colors'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-black bg-white rounded-full'>
                {icon ? (<img src={icon} alt={title} className='w-3 md:w-6 h-3 md:h-6' />) : (<LuUtensils />)}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div className='min-w-0 pr-2'>
                    <p className='text-sm text-primary font-medium truncate overflow-hidden'>{title}</p>
                    <p className='text-xs text-white mt-1'>{date}</p>
                </div>

                <div className='flex items-center gap-5'>
                    {!hideDeleteBtn && (
                        <div className="flex items-center gap-5 transition-opacity">
                            <button className='text-gray-400 hover:text-green-500 cursor-pointer' onClick={onEdit}><LuPencil size={18} /></button>
                            <button className='text-gray-400 hover:text-primary cursor-pointer' onClick={onDelete}><LuTrash2 size={18} /></button>
                        </div>
                    )}

                    <div className={`flex items-center gap-2  px-3 py-1.5 rounded-md ${type === "income" ? "bg-slate-100/20 text-green-500" : "bg-slate-100/20 text-red-500"}`}>
                        <h6 className='text-xs font-medium'>₹ {addThousandsSeparator(amount)}</h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard;