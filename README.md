# 💰 Track Pocket

Track Pocket is a powerful, modern **Expense Tracker** application built with the **MERN Stack** (MongoDB, Express.js, React 19, Node.js) and styled with **Tailwind CSS 4**. It provides a comprehensive solution for managing personal finances, tracking income and expenses, and monitoring debts and loans with a sleek, dark-themed dashboard.

---

## 🚀 Key Features

- 📊 **Dynamic Dashboard** — Real-time overview of total balance, income, and expenses with interactive charts.
- 💸 **Expense & Income Management** — Categorize transactions with emojis and clear descriptions.
- 🏦 **Loan & Debt Tracking** — Specialized module to track borrowed and lent money, including repayment status.
- 📈 **Visual Analytics** — Interactive Pie and Bar charts (using Recharts) for spending patterns.
- 📥 **Excel Export** — Download your transaction data as `.xlsx` files for offline analysis.
- 🔒 **Secure Authentication** — JWT-based authentication with protected routes and password hashing.
- 📱 **Premium UI/UX** — Modern, mobile-responsive dark mode built with Tailwind CSS 4 and Poppins typography.
- 🔔 **Instant Feedback** — Real-time toast notifications for all user actions.

---

## 🏗️ Technical Stack

### Frontend
- **React 19** (Vite-powered)
- **Tailwind CSS 4** (Modern styling engine)
- **Recharts** (Data visualization)
- **React Router 7** (Declarative routing)
- **Axios** (API communication)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Data modeling)
- **JWT (JSON Web Tokens)** (Secure auth)
- **Bcrypt.js** (Password security)
- **Multer** (File handling)
- **XLSX** (Excel generation)

---

## 📂 Project Structure

```text
Expense_Tracker/
├── frontend/             # React + Tailwind CSS client
│   ├── src/
│   │   ├── components/   # UI components (Layout, Common, Finance, Charts)
│   │   ├── pages/        # Dashboard, Auth, Income, Expense, Loans
│   │   ├── hooks/        # Custom React hooks (Auth)
│   │   └── utils/        # Axios instance, API paths, Helpers
└── backend/              # Express + MongoDB server
    ├── controllers/      # Route logic
    ├── models/           # Mongoose schemas (User, Income, Expense, Loan)
    ├── routes/           # API endpoints (Auth, Income, Expense, Loan, Dashboard)
    ├── middleware/       # Auth guards
    └── config/           # Database connection
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SanthoshReddy-5/Expense_Tracker.git
cd Expense_Tracker
```

### 2️⃣ Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend` folder:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### 3️⃣ Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🖥️ Usage

1. **Register/Login**: Create a secure account to start tracking.
2. **Dashboard**: View your financial health at a glance.
3. **Transactions**: Add daily income or expenses with custom categories.
4. **Loans**: Keep track of money lent to others or borrowed from banks/friends.
5. **Insights**: Use the charts to analyze your spending habits.
6. **Export**: Export your data to Excel from the transactions pages.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

## 📜 License

This project is licensed under the MIT License.

