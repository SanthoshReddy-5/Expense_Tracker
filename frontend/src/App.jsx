import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from '../src/context/UserContext';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/SignIn' exact element={<SignIn />} />
            <Route path='/SignUp' exact element={<SignUp />} />
            <Route path='/Dashboard' exact element={<Home />} />
            <Route path='/Income' exact element={<Income />} />
            <Route path='/Expense' exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }} />

    </UserProvider>
  );
};

export default App;


const Root = () => {
  // Check if token exists in the local storage or not
  const isAuthenticated = !!localStorage.getItem('token');

  // Redirect to Dashboard if Authenticated, otherwise SignIn
  return isAuthenticated ? (
    <Navigate to='/Dashboard' />
  ) : (
    <Navigate to='/SignIn' />
  );

}