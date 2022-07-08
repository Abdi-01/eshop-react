import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Text, Avatar, AvatarBadge } from '@chakra-ui/react';

const NavbarComponent = (props) => {

    const { pathname } = window.location;
    const navigate = useNavigate();

    const { username, status, role } = useSelector((state) => {
        return {
            username: state.userReducer.username,
            status: state.userReducer.status,
            role: state.userReducer.role,
        }
    });

    return <div
        className={`navbar navbar-expand-lg ${pathname != '/' || pathname != '/register' ?
            'navbar-light' :
            'navbar-dark bg-transparent'} `}>
        <div className='container '>
            <span className={`navbar-brand btn ${pathname == '/' ? 'text-white' : ''}`} onClick={() => navigate('/')}>
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
                        <span className='nav-link active btn' onClick={() => navigate('/products')}>
                            Product
                        </span>
                    </li>
                </ul>
                <div className='d-flex'>
                    {
                        username ?
                            <div>
                                <div className='d-flex align-items-center'>
                                    <Text className='text-white me-3' fontStyle='italic' >{status}</Text>
                                    <Avatar name={username} size='md'>
                                        <AvatarBadge boxSize='1em' bg='green.500' />
                                    </Avatar>
                                </div>
                            </div>
                            :
                            <div className='btn-group'>
                                <button className='btn btn-outline-light' type='button'
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
                                </button>
                                <button className='btn btn-primary'
                                    type='button'
                                    onClick={() => navigate('/register')}>
                                    Sign Up
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default NavbarComponent;