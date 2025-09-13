# 💰 Track Pocket
Track Pocket is a modern **Expense Tracker** application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and styled with **TailwindCSS**.  
It helps you easily track income, expenses, and overall balance with a clean, responsive UI and secure backend.

## 🚀 Features
- 📊 **Expense & Income Tracking** — Add, view, and delete transactions easily.
- 🔒 **Secure Authentication** — User sign-up, login, and protected routes.
- 📱 **Responsive UI** — Built with TailwindCSS for a modern mobile-first design.
- ⚡ **Fast & Scalable** — MERN stack with RESTful APIs.
- 🗄️ **Persistent Data** — MongoDB for reliable storage.
- 
## 🏗️ Tech Stack
### Frontend
- React.js
- TailwindCSS
- Axios (for API calls)
- React Router
### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment variables

## 📂 Project Structure
```
track-pocket/
├── frontend/ # React + TailwindCSS client
└── backend/ # Express + MongoDB server
```
- **frontend/** — Contains the React UI with TailwindCSS styling.
- **backend/** — Contains the REST API, database models, routes, and authentication logic.

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/SanthoshReddy-5/Expense_Tracker.git
cd Expense_Tracker
```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file in the backend folder with:
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Run the backend using the below command:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```
Run the frontend using the below command:
```bash
npm run dev
```

## 🖥️ Usage
Register or log in to your account.
Add income and expense transactions.
View your balance and transaction history.
Delete transactions when needed.

## 🤝 Contributing
Contributions are welcome!
If you'd like to improve Track Pocket, feel free to fork the repo, make changes, and submit a pull request.

## 📜 License
This project is licensed under the MIT License.
