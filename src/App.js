import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import './App.css';
import FooterComponent from './Components/Footer';
import ProductsAdmin from './Pages/Admin/Products';
import Products from './Pages/Products';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <div >
      <div style={{ position: "absolute" }} className="w-100">
        <NavbarComponent kirimDong="Kirim Bos" />

      </div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/products/admin' element={<ProductsAdmin />} />
        <Route path='/products' element={<Products />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
