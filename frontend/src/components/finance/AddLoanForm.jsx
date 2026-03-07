import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import { calculateExpectedRepayment } from '../../utils/loanCalculations';

const AddLoanForm = ({ onAddLoan }) => {
    const [loan, setLoan] = useState({
        type: 'borrowed',
        counterparty: '',
        principalAmount: '',
        interestRate: '',
        interestType: 'simple',
        repaymentType: 'emi',
        durationMonths: '',
        startDate: new Date().toISOString().split('T')[0]
    });

    const [expectedRepayment, setExpectedRepayment] = useState(0);

    // Recalculate preview live
    useEffect(() => {
        const val = calculateExpectedRepayment(
            loan.principalAmount,
            loan.interestRate,
            loan.repaymentType,
            loan.durationMonths,
            loan.interestType
        );
        setExpectedRepayment(val);
    }, [loan.principalAmount, loan.interestRate, loan.repaymentType, loan.durationMonths, loan.interestType]);

    const handleChange = (name, value) => {
        setLoan((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddLoan(loan);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='col-span-2 md:col-span-1'>
                        <label className='text-xs text-gray-400 mb-1 block'>Loan Type</label>
                        <select
                            className='w-full text-sm text-black bg-slate-100 rounded p-2 md:py-2.5 outline-none'
                            value={loan.type}
                            onChange={(e) => handleChange("type", e.target.value)}
                        >
                            <option value="borrowed">Borrowed (I owe them)</option>
                            <option value="lent">Lent (They owe me)</option>
                        </select>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Input
                            type="text"
                            label={loan.type === 'borrowed' ? "Lender Name" : "Borrower Name"}
                            placeholder="Bank, Friend, etc."
                            value={loan.counterparty}
                            onChange={(e) => handleChange("counterparty", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Input
                            type="number"
                            label="Principal Amount (₹)"
                            placeholder="Enter amount"
                            value={loan.principalAmount}
                            onChange={(e) => handleChange("principalAmount", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Input
                            type="number"
                            label="Duration (Months)"
                            placeholder="e.g 12"
                            value={loan.durationMonths}
                            onChange={(e) => handleChange("durationMonths", e.target.value)}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <label className='text-xs text-gray-400 mb-1 block'>Repayment Strategy</label>
                        <select
                            className='w-full text-sm text-black bg-slate-100 rounded p-2 md:py-2.5 outline-none'
                            value={loan.repaymentType}
                            onChange={(e) => handleChange("repaymentType", e.target.value)}
                        >
                            <option value="emi">EMI (Monthly Installments)</option>
                            <option value="lumpsum">Single Lumpsum at end</option>
                        </select>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Input
                            type="number"
                            label="Interest Rate (%)"
                            placeholder="Annual %"
                            value={loan.interestRate}
                            onChange={(e) => handleChange("interestRate", e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-5 p-4 bg-gray-900 border border-slate-700 rounded-lg flex items-center justify-between'>
                    <div>
                        <p className='text-xs text-gray-400'>Total Expected Repayment</p>
                        <p className='text-lg font-bold text-primary'>₹ {Math.round(expectedRepayment).toLocaleString()}</p>
                    </div>
                    {loan.repaymentType === 'emi' && loan.durationMonths > 0 && (
                        <div className='text-right'>
                            <p className='text-xs text-gray-400'>Expected EMI</p>
                            <p className='text-lg font-bold text-white'>₹ {Math.round(expectedRepayment / loan.durationMonths).toLocaleString()}</p>
                        </div>
                    )}
                </div>

                <div className='flex justify-end mt-6'>
                    <button type="submit" className='add-btn add-btn-fill px-8'>
                        Save Loan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddLoanForm;
