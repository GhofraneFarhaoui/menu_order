import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './login/adminLogin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
