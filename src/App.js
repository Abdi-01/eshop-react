import React from 'react';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import './App.css';
import FooterComponent from './Components/Footer';

function App() {
  return (
    <div >
      <div style={{ position: "absolute" }} className="w-100">
        <NavbarComponent />

      </div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
