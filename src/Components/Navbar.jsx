import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = (props) => {

    const { pathname } = window.location;
    const navigate = useNavigate();

    console.log(pathname)
    return <div
        className={`navbar navbar-expand-lg ${pathname.includes('/admin') ?
            'navbar-light' :
            'navbar-dark bg-transparent'} `}>
        <div className='container '>
            <span className='navbar-brand btn' onClick={() => navigate('/')}>
                <span className='fw-bold'>
                    E-SHOP
                </span>
                <span className='lead ms-1 '>
                    | Furniture
                </span>
            </span>
            <button className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                href='#eshopNavbar'
                aria-controls='eshopNavbar'
                aria-expanded="false"
            // aria-label="Toggle navigation"
            >
                <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='eshopNavbar'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li>
                        <span className='nav-link active'>
                            Product
                        </span>
                    </li>
                </ul>
                <div className='d-flex'>
                    <div className='btn-group'>
                        <button className='btn btn-outline-light'>Sign In</button>
                        <button className='btn btn-primary'
                            type='button'
                            onClick={() => navigate('/register')}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default NavbarComponent;