import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/client/homePage/homePage';
import CategoryItems from './pages/client/categoryItems/categoryItems';
import OrderPage from './pages/client/orderPage/orderPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category-items/:categoryId" element={<CategoryItems />} />
        <Route path="/order" element={<OrderPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
