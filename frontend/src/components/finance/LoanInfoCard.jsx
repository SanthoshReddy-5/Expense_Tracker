import React from 'react';
import { LuLandmark, LuTrash2, LuTrendingUp, LuTrendingDown, LuCheckCircle, LuClock } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper';
import moment from 'moment';

const LoanInfoCard = ({ loan, onDelete, onSettle }) => {

    const isLent = loan.type === 'lent';
    const isSettled = loan.status === 'settled';
    const formattedDate = moment(loan.dueDate).format("Do MMM YYYY");

    // Color coordination based on loan type.
    const iconBgClass = isLent ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";
    const amountClass = isLent ? "text-green-500" : "text-red-500";

    return (
        <div className='group relative flex flex-col gap-3 mt-3 p-4 rounded-xl border border-slate-700 bg-gray-900 shadow-sm hover:border-gray-500 transition-colors'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className={`w-10 h-10 flex items-center justify-center text-lg rounded-full ${iconBgClass}`}>
                        <LuLandmark />
                    </div>
                    <div>
                        <p className='text-sm text-primary font-bold'>{loan.counterparty}</p>
                        <p className='text-[11px] text-gray-400 capitalize'>{loan.type} • {loan.repaymentType}</p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    {/* Hover Action Buttons */}
                    {!isSettled && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className='text-gray-400 hover:text-green-400 cursor-pointer' onClick={onSettle} title="Mark as Settled">
                                <LuCheckCircle size={18} />
                            </button>
                            <button className='text-gray-400 hover:text-red-500 cursor-pointer' onClick={onDelete} title="Delete Record">
                                <LuTrash2 size={18} />
                            </button>
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className={`text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1 ${isSettled ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
                        {isSettled ? "Settled" : "Active"}
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between border-t border-slate-700 pt-3 mt-1'>
                <div>
                    <p className='text-[10px] text-gray-400 mb-0.5'>Total Due Amount</p>
                    <div className={`text-sm font-bold flex items-center gap-1.5 ${amountClass}`}>
                        ₹ {addThousandsSeparator(loan.totalRepaymentAmount)}
                        {isLent ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
                    </div>
                </div>

                <div className='text-right'>
                    <p className='text-[10px] text-gray-400 mb-0.5'>Due Date</p>
                    <div className='text-sm text-white font-medium flex items-center justify-end gap-1.5'>
                        <LuClock size={12} className={new Date() > new Date(loan.dueDate) && !isSettled ? "text-red-500" : "text-gray-400"} />
                        {formattedDate}
                    </div>
                </div>
            </div>

            {loan.repaymentType === 'emi' && !isSettled && (
                <div className='w-full mt-1'>
                    <div className='flex justify-between text-[10px] text-gray-400 mb-1'>
                        <span>EMI Progress</span>
                        <span>{loan.installmentsPaid} / {loan.durationMonths} Paid</span>
                    </div>
                    <div className='w-full bg-slate-700 rounded-full h-1.5'>
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(loan.installmentsPaid / loan.durationMonths) * 100}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoanInfoCard;
