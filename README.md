# 💰 Track Pocket

**Track Pocket** is a modern **Expense Tracker** application built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and styled with **Tailwind CSS**. It  provides an interactive dashboard where users can visualize their financial data through charts and organized transaction lists. Users can easily add, edit and delete income or expense records, monitor financial trends and maintain better control over their spending habits.

### 🚀 Key Features

- **Dynamic Dashboard** – Real-time overview of total balance, income and expenses with interactive charts.
- **Transaction Management** – Easily add, edit and delete income or expense records.
- **Visual Analytics** – Interactive Pie and Bar charts for analyzing spending patterns using Recharts.
- **Excel Export** – Download transaction data as `.xlsx` files for offline analysis.
- **Secure Authentication** – JWT-based authentication with protected routes and password hashing.
- **Modern UI/UX** – Clean, responsive interface built with Tailwind CSS and Poppins typography.
- **Instant Feedback** – Real-time toast notifications for user actions.

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios, React Router, Recharts  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Tokens) 

## 📂  Project Structure

```text
Expense_Tracker/
├── frontend/             # React + Tailwind CSS
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Dashboard, Auth, Income, Expense
│   │   ├── hooks/        # Custom React hooks (Auth)
│   │   └── utils/        # Axios instance, API paths, Helpers
└── backend/              # Express + MongoDB
    ├── controllers/      # Route logic
    ├── models/           # Mongoose schemas (User, Income, Expense)
    ├── routes/           # API endpoints (Auth, Income, Expense, Dashboard)
    ├── middleware/       # Auth guards
    └── config/           # Database connection
```

## 📦 Installation & Setup

### 1️. Clone the Repository
```bash
git clone https://github.com/SanthoshReddy-5/Expense_Tracker.git
cd Expense_Tracker
```

### 2️. Backend Setup
Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
Create a .env file in the backend folder with the following:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
Start the backend server:
   ```bash
   npm run dev
   ```
   The backend server should now be running at http://localhost:8000

### 3️. Frontend Setup
Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will typically run at http://localhost:5173

## 🤝 Contributing

Contributions are always welcome! Whether it's fixing bugs, adding new features, improving documentation or suggesting ideas, your help makes this project better.

## 📜 License

This project is licensed under the MIT License.
