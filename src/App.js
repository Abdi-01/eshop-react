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
import Axios from 'axios';
import { API_URL } from './helper';
import { useDispatch } from 'react-redux';
import { loginAction } from './actions/userAction';

function App() {

  const dispatch = useDispatch();

  const keepLogin = () => {
    let eshopLog = localStorage.getItem('eshopLog');
    if (eshopLog) {
      Axios.get(API_URL + `/users?id=${eshopLog}`)
        .then((res) => {
          if (res.data.length > 0) {
            localStorage.setItem('eshopLog', res.data[0].id)
            dispatch(loginAction(res.data[0]));
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  React.useEffect(() => {
    keepLogin()
  }, []);

  return (
    <div >
      <div style={{ position: "absolute" }} className="w-100">
        <NavbarComponent />
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
