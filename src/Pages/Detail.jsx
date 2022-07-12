import React from 'react';
import { Image, Text } from '@chakra-ui/react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCartAction } from '../actions/userAction';

const DetailPage = (props) => {

    const [detail, setDetail] = React.useState(null);
    const [qty, setQty] = React.useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, cart } = useSelector(({ userReducer }) => {
        return {
            id: userReducer.id,
            cart: userReducer.cart,
        }
    })

    const { state, search } = useLocation();
    console.table(useLocation())

    // console.log('DATA DARI PRODUCTS PAGE', state)
    console.log('DATA DARI URL PRODUCT DETAIL PAGE', search)

    const getDetail = () => {
        Axios.get(API_URL + `/products${search}`)
            .then((res) => {
                console.log(res.data)
                setDetail(res.data[0]);
            }).catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        getDetail()
    }, []);

    const onInc = () => {
        console.log(state.stock)
        if (qty < state.stock) {
            setQty(qty + 1)
        }
    }

    const onDec = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    const onBuy = () => {
        // 1. Menambahkan data product kedalam data keranjang sebelumnya
        let temp = [...cart];
        temp.push({
            idProduct: state.id,
            images: state.images,
            name: state.name,
            brand: state.brand,
            category: state.category,
            qty
        })
        // 2. Melakukan update data ke db.json
        axios.patch(API_URL + `/users/${id}`, {
            cart: temp
        })
            .then((res) => {
                // 3. Melakukan update data lagi ke reducer
                console.log(res.data)
                dispatch(updateCartAction(res.data.cart));
                // 4. Redirect ke cart page
                navigate('/cart');
            }).catch((err) => {
                console.log(err);
            })

    }

    return <div className='container main-page p-5'>
        <div className='row'>
            <div className="col-12 col-md-6">
                <Image
                    className='shadow-sm' boxSize='100%' margin='auto' objectFit='cover' src={state.images}
                    fallbackSrc='https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI=' />
                <Text opacity={0.6} fontSize={['3xl', '6xl']} className='muted-color position-relative' top={'-10%'}>{state.category.toUpperCase()}</Text>
            </div>
            <div className="col-12 col-md-6">
                <div className='d-flex'>
                    <div>
                        <Text fontSize={['4xl', '6xl']} className='main-color fw-bold'>{state.name}</Text>
                        <div className='d-flex'>
                            <Text fontSize='4xl' className='main-color me-3'>by</Text>
                            <Text fontSize='4xl' className='text-muted fw-bold'>{state.brand}</Text>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <label className='muted-color'>Description</label>
                    <p style={{ textAlign: 'justify' }}>
                        {state.description}
                    </p>
                </div>
                <Text fontSize={['4xl', '6xl']} className='text-muted fw-bold'>Rp. {state.price.toLocaleString()}</Text>
                <div className='d-flex my-4'>
                    <div className='btn-group'>
                        <button className='btn' type='button' onClick={onDec}>
                            <AiFillMinusCircle className='main-color' size={28} />
                        </button>
                        <Text fontSize='3xl' className='text-muted fw-bold'>{qty}</Text>
                        <button className='btn' type='button' onClick={onInc}>
                            <AiFillPlusCircle className='main-color' size={28} />
                        </button>
                    </div>
                    <button className='btn btn-outline-primary w-100' type='button' onClick={onBuy}>Buy</button>
                </div>
            </div>
        </div>
        <hr className='my-5' />
    </div>
}

export default DetailPage;