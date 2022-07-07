import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import './App.css';
import FooterComponent from './Components/Footer';
import ProductsAdmin from './Pages/Admin/Products';

function App() {
  return (
    <div >
      <div style={{ position: "absolute" }} className="w-100">
        <NavbarComponent />

      </div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisPage />} />
        <Route path='/products/admin' element={<ProductsAdmin/>} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
