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
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './actions/userAction';
import DetailPage from './Pages/Detail';
import NotFoundPage from './Pages/NotFoundPage';
import CartPage from './Pages/Cart';

function App() {

  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  const { role } = useSelector(({ userReducer }) => {
    return {
      role: userReducer.role
    }
  })

  const keepLogin = () => {
    let eshopLog = localStorage.getItem('eshopLog');
    if (eshopLog) {
      Axios.get(API_URL + `/users?id=${eshopLog}`)
        .then((res) => {
          if (res.data.length > 0) {
            localStorage.setItem('eshopLog', res.data[0].id)
            setLoading(false);
            dispatch(loginAction(res.data[0]));
          }
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    keepLogin()
  }, []);

  return (
    <div >
      <div style={{ position: "absolute" }} className="w-100">
        <NavbarComponent loading={loading} />
      </div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {
          role ?
            null :
            <>
              <Route path='/register' element={<RegisPage />} />
              <Route path='/login' element={<LoginPage />} />
            </>
        }
        {
          role == 'Admin' &&
          <>
            <Route path='/products/admin' element={<ProductsAdmin />} />
          </>
        }

        <Route path='/cart' element={<CartPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/detail' element={<DetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
