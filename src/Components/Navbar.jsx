import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Text, Avatar, AvatarBadge, Spinner, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Badge
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';

import { logoutAction } from '../actions/userAction';

const NavbarComponent = (props) => {

    const { pathname } = window.location;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username, status, role, cart } = useSelector((state) => {
        return {
            username: state.userReducer.username,
            status: state.userReducer.status,
            role: state.userReducer.role,
            cart: state.userReducer.cart
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
                        props.loading ? <Spinner /> :
                            username && !props.loading ?
                                <Menu>
                                    <MenuButton>
                                        <div className='d-flex align-items-center'>
                                            <Text className='text-white me-3' fontStyle='italic' >{status}</Text>
                                            <Avatar name={username} size='md'>
                                                <AvatarBadge boxSize='1em' bg='green.500' />
                                            </Avatar>
                                        </div>
                                    </MenuButton>
                                    <MenuList textColor='black'>
                                        {
                                            role == 'Admin' ?
                                                <div>
                                                    <MenuItem onClick={() => navigate('/products/admin')}>Products Management</MenuItem>
                                                    <MenuItem>Transactions Management</MenuItem>
                                                </div>
                                                :
                                                <div>
                                                    <MenuItem>Cart <Badge colorScheme='green'>{cart.length}</Badge> </MenuItem>
                                                    <MenuItem>Profile</MenuItem>
                                                </div>

                                        }
                                        <MenuDivider />
                                        <MenuItem onClick={() => dispatch(logoutAction())}>Signout<AiOutlineLogout className='ms-2' /></MenuItem>
                                    </MenuList>
                                </Menu>
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