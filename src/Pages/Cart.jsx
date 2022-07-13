import React from 'react';
import {
    Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import axios from 'axios';
import { API_URL } from '../helper';
import { updateCartAction } from '../actions/userAction';

const CartPage = (props) => {
    const dispatch = useDispatch();
    const { id, cart } = useSelector(({ userReducer }) => {
        return {
            id: userReducer.id,
            cart: userReducer.cart,
        }
    })

    const [selectedShipping, setSelectedShipping] = React.useState(null);
    const [shipping, setShipping] = React.useState([
        {
            id: 1,
            type: 'Reguler',
            pay: 0.05
        },
        {
            id: 2,
            type: 'Next Day',
            pay: 0.075
        },
        {
            id: 3,
            type: 'Same Day',
            pay: 0.1
        }
    ]);

    const onShipping = (idShipping) => {
        let select = shipping.filter(val => val.id == idShipping);
        setSelectedShipping(select[0]);
    }

    const printShipping = () => {
        return shipping.map((val, idx) => <option value={val.id} key={val.id}>{val.type} - Rp. {(totalProductPay() * val.pay).toLocaleString()}</option>)
    }

    const onInc = async (idProduct) => {
        try {
            let temp = [...cart];
            let idx = cart.findIndex(val => val.idProduct == idProduct);
            // Menampung data object berdasarkan index yang dipilih
            let newData = {
                ...temp[idx]
            }

            let resGet = await axios.get(API_URL + `/products?id=${idProduct}`)
            if (newData.qty < resGet.data[0].stock) {
                newData.qty += 1
                // temp.splice(idx, 1, newData); //Cara 1
                temp[idx] = newData; // Cara 2

                let resPatch = await axios.patch(API_URL + `/users/${id}`, {
                    cart: temp
                })

                dispatch(updateCartAction(resPatch.data.cart));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onDec = async (idProduct) => {
        try {
            let temp = [...cart];
            let idx = cart.findIndex(val => val.idProduct == idProduct);
            // Menampung data object berdasarkan index yang dipilih
            let newData = {
                ...temp[idx]
            }

            if (newData.qty > 1) {
                newData.qty -= 1
                // temp.splice(idx, 1, newData); //Cara 1
                temp[idx] = newData; // Cara 2

                let resPatch = await axios.patch(API_URL + `/users/${id}`, {
                    cart: temp
                })

                dispatch(updateCartAction(resPatch.data.cart));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onRemove = (idProduct) => {
        let temp = [...cart];
        let idx = temp.findIndex(val => val.idProduct == idProduct);

        temp.splice(idx, 1);

        axios.patch(API_URL + `/users/${id}`, {
            cart: temp
        }).then((res) => {
            dispatch(updateCartAction(res.data));
        }).catch((err) => {
            console.log(err);
        })
    }

    const printData = () => {
        return cart.map((val, idx) => {
            return <Tr key={val.idProduct}>
                <Td className='row'>
                    <div className='col-6'>
                        <img src={val.images} className='shadow rounded-3' alt={val.name} width="100%" />
                    </div>
                    <div className='col-6 d-flex flex-column justify-content-evenly'>
                        <Text fontSize='xl' className='fw-bold p-3'>{val.name}</Text>
                        <Text fontSize='lg' className='main-color p-3'>{val.brand}</Text>
                        <button onClick={() => onRemove(val.idProduct)} className='btn p-3' style={{ textAlign: 'left', width: 'fit-content', color: 'red' }} type='button'>
                            Remove
                        </button>
                    </div>
                </Td>
                <Td>
                    <div className='btn-group align-items-center'>
                        <button className='btn' type='button' onClick={() => onDec(val.idProduct)}>
                            <AiFillMinusCircle className='main-color' size={28} />
                        </button>
                        <Text fontSize='3xl' className='text-muted fw-bold'>{val.qty.toLocaleString()}</Text>
                        <button className='btn' type='button' onClick={() => onInc(val.idProduct)}>
                            <AiFillPlusCircle className='main-color' size={28} />
                        </button>
                    </div>
                </Td>
                <Td isNumeric>Rp. {val.price.toLocaleString()}</Td>
                <Td isNumeric>Rp. {(val.price * val.qty).toLocaleString()}</Td>
            </Tr>
        })
    }

    const totalProductPay = () => {
        let total = 0;
        cart.forEach((val) => {
            total += val.price * val.qty
        })

        return total;
    }

    const onCheckout = async () => {
        try {
            // idUser, invoice, date, total_price, ongkir, detail, status
            let date = new Date();
            let data = {
                idUser: id,
                invoice: `#INV/${date.getTime()}`,
                date: date.toLocaleString(),
                total_price: totalProductPay(),
                // ongkir,
                detail: cart,
                status: 'UNPAID'
            }

            console.table(data);
        } catch (error) {
            console.log(error)
        }
    }

    return <div className='container main-page'>
        <div>
            <Text fontSize="4xl" className='fw-bold text-muted'>Shopping Cart</Text>
            <p className='muted-color'>
                Buy product and <span className="main-color fw-bold"> pay more easily.</span>
            </p>
        </div>
        <div className='row my-3' >
            <div className='col-12 col-md-9 p-3'>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>PRODUCT DETAIL</Th>
                                <Th>QUANTITY</Th>
                                <Th>PRICE</Th>
                                <Th>SUB. TOTAL</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {printData()}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            <div className='col-12 col-md-3 bg-light p-3 shadow'>
                <Text fontSize="2xl" className='fw-bold text-muted'>Order Summary</Text>
                <hr className='my-3' />
                <div className='d-flex justify-content-between'>
                    <Text fontSize="xl" className='fw-bold text-muted'>ITEMS {cart.length}</Text>
                    <Text fontSize="xl" className='fw-bold text-muted'>Rp. {totalProductPay().toLocaleString()}</Text>
                </div>
                <Text fontSize="xl" className='fw-bold text-muted my-3'>SHIPPING</Text>
                <select className='form-select' onChange={(e) => setSelectedShipping(e.target.value)}>
                    <option selected>Select shipping</option>
                    {
                        printShipping()
                    }
                </select>
                <Text fontSize="xl" className='fw-bold text-muted my-3'>PROMO CODE</Text>
                <input className='form-control m-auto' type='text' placeholder='Enter your code' />
                <button className='btn btn-outline-warning my-2' type='button'>
                    Apply
                </button>
                <hr className='my-3' />
                <div className='d-flex justify-content-between'>
                    <Text fontSize="xl" className='fw-bold text-muted'>TOTAL COST</Text>
                    <Text fontSize="xl" className='fw-bold text-muted'>Rp. {totalProductPay().toLocaleString()}</Text>
                </div>
                <button className='btn btn-primary my-3 w-100' type='button' onClick={onCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    </div>
}

export default CartPage;