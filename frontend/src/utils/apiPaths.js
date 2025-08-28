export const BASE_URL="http://localhost:8000";

export const API_PATHS={
    AUTH:{
        SIGNIN:"/api/v1/Auth/SignIn",
        SIGNUP:"/api/v1/Auth/SignUp",
        GET_USER_INFO:"/api/v1/Auth/GetUserInfo"
    },
    DASHBOARD:{
        GET_DASHBOARD_DATA:"/api/v1/Dashboard"
    },
    INCOME:{
        ADD_INCOME:"/api/v1/Income/AddIncome",
        GET_ALL_INCOME:"/api/v1/Income/GetAllIncome",
        DELETE_INCOME:(incomeId)=>`/api/v1/Income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/v1/Income/DownloadIncomeExcel"
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/v1/Expense/AddExpense",
        GET_ALL_EXPENSE:"/api/v1/Expense/GetAllExpense",
        DELETE_EXPENSE:(expenseId)=>`/api/v1/Expense/${expenseId}`,
        DOWNLOAD_EXPENSE:"/api/v1/Expense/DownloadExpenseExcel"
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/Auth/UploadImage"
    }
};