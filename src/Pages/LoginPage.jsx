import React from 'react';
import { Text } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai'
import Axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions/userAction';
import { useDispatch } from 'react-redux';
const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onLogin = () => {
        Axios.post(API_URL + `/auth/login`,{
            email,
            password
        })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('eshopLog', res.data.iduser);
                dispatch(loginAction(res.data));
                navigate('/', { replace: true });
            }).catch((err) => {
                console.log(err);
            })
    }

    return <div id='loginpage'>
        <div className='container py-5'>
            <div id='form-login' className='card bg-white my-5 w-50 p-5 m-auto shadow'>
                <Text fontSize='4xl' className='fw-bold'>Sign in for shoping</Text>
                <div className='d-flex'>
                    <h6 className='muted-color'>Not have account ?</h6>
                    <h6 className='ms-2 main-color'>Sign Up</h6>
                </div>
                <div className='mt-5 mb-3'>
                    <label className='form-label fw-bold text-muted'>Email</label>
                    <input type='email' className='form-control p-3' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label className='form-label fw-bold text-muted'>Password</label>
                    <div className='input-group border rounded'>
                        <input type='password' className='form-control p-3 border-0' onChange={(e) => setPassword(e.target.value)} />
                        <span className='input-group-text bg-transparent border-0'>
                            <AiOutlineEye />
                        </span>
                    </div>
                </div>
                <p className='text-muted my-3' style={{ textAlign: 'right' }}>Forgot password ?<span className='main-color'>Click here</span></p>
                <button className='btn btn-primary py-3 shadow mt-3' type='button' onClick={onLogin}>Sign In</button>
            </div>
        </div>
    </div>
}

export default LoginPage;