import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Auth/SignIn';
import Organization from './Organization/Organization';
import Employee from './Employee/Employee';
import SignUp from './Auth/SignUp';
import EmployeeView from './Employee/EmpView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/organization" element={<Organization />} />
        <Route path="/employees" element={<Employee />} />
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/account' element={<EmployeeView />}></Route>

      </Routes>
    </Router>
  </>
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
