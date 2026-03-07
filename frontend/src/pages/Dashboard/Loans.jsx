import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosIntance from '../../utils/axiosIntance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/common/InfoCard';
import { LuLandmark, LuPlus, LuDownload } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper';
import Modal from '../../components/common/Modal';
import AddLoanForm from '../../components/finance/AddLoanForm';
import LoanInfoCard from '../../components/finance/LoanInfoCard';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/common/DeleteAlert';

const Loans = () => {
    useUserAuth();

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, id: null });

    const fetchLoans = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosIntance.get(API_PATHS.LOAN.GET_ALL_LOANS);
            if (response.data) {
                setLoans(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch loans:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
        return () => { };
    }, []);

    const handleAddLoan = async (loanData) => {
        // Validation
        if (!loanData.counterparty.trim() || !loanData.principalAmount || !loanData.durationMonths) {
            toast.error("Please fill all necessary fields.");
            return;
        }

        try {
            await axiosIntance.post(API_PATHS.LOAN.ADD_LOAN, loanData);
            setOpenAddModal(false);
            toast.success("Loan recorded successfully.");
            fetchLoans();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add loan");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosIntance.delete(API_PATHS.LOAN.DELETE_LOAN(id));
            setOpenDeleteAlert({ show: false, id: null });
            toast.success("Loan record deleted");
            fetchLoans();
        } catch (error) {
            toast.error("Error deleting loan");
        }
    };

    const handleSettle = async (id) => {
        try {
            await axiosIntance.put(API_PATHS.LOAN.UPDATE_LOAN(id), { status: 'settled' });
            toast.success("Loan marked as Settled!");
            fetchLoans();
        } catch (error) {
            toast.error("Error settling loan");
        }
    };

    // Derived State computations
    const totalBorrowed = loans.filter(l => l.type === 'borrowed' && l.status === 'active').reduce((acc, l) => acc + l.totalRepaymentAmount, 0);
    const totalLent = loans.filter(l => l.type === 'lent' && l.status === 'active').reduce((acc, l) => acc + l.totalRepaymentAmount, 0);

    return (
        <DashboardLayout activeMenu="Loans">
            <div className="mx-auto my-5">
                <div className='flex items-center justify-between mb-6'>
                    <h3 className='text-3xl text-white font-semibold'>Loans & Borrowing</h3>
                    <button className='add-btn add-btn-fill' onClick={() => setOpenAddModal(true)}>
                        <LuPlus /> Record Loan
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <InfoCard icon={<LuLandmark />} label="Total I Owe (Active)" value={addThousandsSeparator(totalBorrowed)} color="bg-red-500" />
                    <InfoCard icon={<LuLandmark />} label="Total Owed To Me (Active)" value={addThousandsSeparator(totalLent)} color="bg-green-500" />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <div className='card h-[600px] overflow-y-auto custom-scrollbar border-slate-700'>
                        <h4 className='text-lg text-white mb-2'>Money I Owe (Borrowed)</h4>
                        {loans.filter(l => l.type === 'borrowed').length === 0 ? (
                            <p className='text-sm text-gray-500 mt-5'>No active borrowing records.</p>
                        ) : (
                            loans.filter(l => l.type === 'borrowed').map(loan => (
                                <LoanInfoCard
                                    key={loan._id}
                                    loan={loan}
                                    onDelete={() => setOpenDeleteAlert({ show: true, id: loan._id })}
                                    onSettle={() => handleSettle(loan._id)}
                                />
                            ))
                        )}
                    </div>

                    <div className='card h-[600px] overflow-y-auto custom-scrollbar border-slate-700'>
                        <h4 className='text-lg text-white mb-2'>Money Lent Out (Lent)</h4>
                        {loans.filter(l => l.type === 'lent').length === 0 ? (
                            <p className='text-sm text-gray-500 mt-5'>No active lending records.</p>
                        ) : (
                            loans.filter(l => l.type === 'lent').map(loan => (
                                <LoanInfoCard
                                    key={loan._id}
                                    loan={loan}
                                    onDelete={() => setOpenDeleteAlert({ show: true, id: loan._id })}
                                    onSettle={() => handleSettle(loan._id)}
                                />
                            ))
                        )}
                    </div>
                </div>

                <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} title="Record New Loan/Debt">
                    <AddLoanForm onAddLoan={handleAddLoan} />
                </Modal>

                <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, id: null })} title="Delete Record">
                    <DeleteAlert content="Do you really want to remove this loan record forever?" onDelete={() => handleDelete(openDeleteAlert.id)} />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Loans;
