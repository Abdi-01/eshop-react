import React from 'react';
import { Image, Text } from '@chakra-ui/react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../helper';
import Axios from 'axios';

const DetailPage = (props) => {

    const { state, search } = useLocation();

    // console.log('DATA DARI PRODUCTS PAGE', state)
    console.log('DATA DARI URL PRODUCT DETAIL PAGE', search)

    const getDetail = () => {
        Axios.get(API_URL + `/products${search}`)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(()=>{
        getDetail()
    },[]);

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
                        <button className='btn'><AiFillMinusCircle className='main-color' size={28} /></button>
                        <Text fontSize='3xl' className='text-muted fw-bold'>1</Text>
                        <button className='btn'><AiFillPlusCircle className='main-color' size={28} /></button>
                    </div>
                    <button className='btn btn-outline-primary w-100'>Buy</button>
                </div>
            </div>
        </div>
        <hr className='my-5' />
    </div>
}

export default DetailPage;