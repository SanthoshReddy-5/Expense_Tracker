require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://trackpocket.vercel.app",
    "http://localhost:5173",
    process.env.CLIENT_URL
  ].filter(Boolean);

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});


app.use(express.json());

connectDB();

app.use("/api/v1/Auth", authRoutes);
app.use("/api/v1/Income", incomeRoutes);
app.use("/api/v1/Expense", expenseRoutes);
app.use("/api/v1/Dashboard", dashboardRoutes);
app.use("/api/v1/Loan", loanRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})