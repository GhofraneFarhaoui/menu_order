import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/login/adminLogin';
import Dashboard from './pages/dashboard/dashboard';
import Menu from './pages/Menu/MenuPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;
