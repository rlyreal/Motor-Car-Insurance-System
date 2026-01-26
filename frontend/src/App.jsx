import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Records from './components/dashboard/records';
import './styles/index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<div style={{ padding: '32px' }}><h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Dashboard - Login Successful!</h1></div>} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}

export default App;
