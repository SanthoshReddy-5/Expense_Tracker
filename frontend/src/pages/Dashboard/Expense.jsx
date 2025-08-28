import React,{useState,useEffect } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import toast from 'react-hot-toast';
import axiosIntance from '../../utils/axiosIntance';
import Modal from '../../components/common/Modal';
import AddExpenseForm from '../../components/finance/AddExpenseForm';
import ExpenseOverview from '../../components/finance/ExpenseOverview';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseList from '../../components/finance/ExpenseList';
import DeleteAlert from '../../components/common/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails=async ()=>{
    if(loading) return;

    setLoading(true);

    try{
      const response=await axiosIntance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.log("Something went wrong!",error);
    }finally{
      setLoading(false);
    }
  };

  const handleAddExpense=async (expense)=>{
    const {category,amount,date,icon}=expense;

    if(!category.trim()){
      toast.error("Category is Required!");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be a valid number greater than 0.")
      return;
    }

    if(!date){
      toast.error("Date is Required!");
      return;
    }

    try{
      await axiosIntance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{category,amount,date,icon});

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error adding expense:",error.response?.data?.message || error.message);
    }

  };

  const deleteExpense=async (id)=>{
    try{
      await axiosIntance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error deleting Expense:",error.response?.data?.message || error.message);
    }
  };

  const handleDownloadExpenseDetails=async ()=>{
    try{
      const response=await axiosIntance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{responseType:"blob"});

      const url=window.URL.createObjectURL(new Blob([response.data]));
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
       console.error("Error downloading expense details:",error);
       toast.error("Failed to download expense details!");
    }
  };

  useEffect(()=>{
     fetchExpenseDetails();

     return ()=>{}
  },[]);



  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview transactions={expenseData} onAddExpense={()=>setOpenAddExpenseModal(true)}/>
          </div>

          <ExpenseList transactions={expenseData} onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id});
          }} onDownload={handleDownloadExpenseDetails}/>
        </div>

        <Modal isOpen={openAddExpenseModal} onClose={()=>setOpenAddExpenseModal(false)} title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={()=>setOpenDeleteAlert({show:false,data:null})} title="Delete Expense">
          <DeleteAlert content="Do you really want to remove these expense details?" onDelete={()=>deleteExpense(openDeleteAlert.data)}/>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense;