import React, { useState,useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../utils/axiosIntance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/common/InfoCard';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from 'react-icons/io';
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/finance/RecentTransactions';
import FinanceOverview from '../../components/finance/FinanceOverview';
import ExpenseTransactions from '../../components/finance/ExpenseTransactions';
import Last30DaysExpenses from '../../components/finance/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/finance/RecentIncomeWithChart';
import RecentIncome from '../../components/finance/RecentIncome';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosIntance.get(`${API_PATHS.DASHBOARD.GET_DASHBOARD_DATA}`);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {
    }
  }, []);

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className="mx-auto my-5">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard icon={<IoMdCard/>} label="Total Balance" value={addThousandsSeparator(dashboardData?.totalBalance || 0)} color="bg-primary" />
          <InfoCard icon={<LuWalletMinimal/>} label="Total Income" value={addThousandsSeparator(dashboardData?.totalIncome || 0)} color="bg-primary" />
          <InfoCard icon={<LuHandCoins/>} label="Total Expense" value={addThousandsSeparator(dashboardData?.totalExpense || 0)} color="bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions transactions={dashboardData?.recentTransactions} onSeeMore={()=>navigate("/Expense")} />
              
            <FinanceOverview totalBalance={dashboardData?.totalBalance || 0} totalIncome={dashboardData?.totalIncome || 0} totalExpense={dashboardData?.totalExpense || 0}/>
             
            <ExpenseTransactions transactions={dashboardData?.last30DaysExpenses?.transactions} onSeeMore={()=>navigate("/Expense")} />

            <Last30DaysExpenses data={dashboardData?.last30DaysExpenses?.transactions} />

            <RecentIncomeWithChart data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []} totalIncome={dashboardData?.totalIncome || 0}/>

            <RecentIncome transactions={dashboardData?.last60DaysIncome?.transactions || []} onSeeMore={()=>navigate("/Income")}/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home;