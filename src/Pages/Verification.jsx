import React from 'react';
import { Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/userAction';

const VerificationPage = (props) => {
    const params = useParams(); // mengambil value url params dari routing front-end
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fungsi untuk button verifikasi
    const handleVerified = async () => {
        console.log(params); // memeriksa value params
        try {
            // Request ke API middleware Verification
            // Req.method patch
            let res = await Axios.patch(`${API_URL}/auth/verified`, {}, {
                headers: {
                    'Authorization': `Bearer ${params.token}`
                }
            })
            // Memeriksa response
            console.log(res.data);

            if (res.data.success) { // Jika success maka auto login
                localStorage.setItem('eshopLog', res.data.dataLogin.token); // token disimpan ke localStorage
                delete res.data.dataLogin.token; // properti token dihapus
                dispatch(loginAction(res.data.dataLogin)); // data user disimpan ke reducer
                navigate('/', { replace: true }); // redirect ke landing page
            }else{
                alert('Verification failed ❌')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id='verify' className='container main-page'>
            <div className='d-flex flex-column align-items-center pt-5'>
                <span className="material-icons my-3" style={{ color: "#48dbfb", fontSize: "200px" }}>
                    beenhere
                </span>
                <h5 className='text-muted text-center'>
                    After Register, you can acces all feature with verified acoount
                </h5>
                <Button color='success'
                    type='button'
                    outline
                    className='my-5'
                    onClick={handleVerified}
                >
                    Verified Your Account
                </Button>
            </div>
        </div>
    )
}

export default VerificationPage;