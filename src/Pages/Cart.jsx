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

const CartPage = (props) => {

    const { id, cart } = useSelector(({ userReducer }) => {
        return {
            id: userReducer.id,
            cart: userReducer.cart,
        }
    })

    const onInc = () => {
        // console.log(state.stock)
        // if (qty < state.stock) {
        //     setQty(qty + 1)
        // }
    }

    const onDec = () => {
        // if (qty > 1) {
        //     setQty(qty - 1)
        // }
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
                        <button className='btn p-3' style={{ textAlign: 'left', width: 'fit-content', color: 'red' }} type='button'>
                            Remove
                        </button>
                    </div>
                </Td>
                <Td>
                    <div className='btn-group align-items-center'>
                        <button className='btn' type='button' onClick={onDec}>
                            <AiFillMinusCircle className='main-color' size={28} />
                        </button>
                        <Text fontSize='3xl' className='text-muted fw-bold'>{val.qty.toLocaleString()}</Text>
                        <button className='btn' type='button' onClick={onInc}>
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

    return <div className='container main-page'>
        <div>
            <Text fontSize="4xl" className='fw-bold text-muted'>Shopping Cart</Text>
            <p className='muted-color'>
                Buy product and <span className="main-color fw-bold"> pay more easily.</span>
            </p>
        </div>
        <div className='row my-3' >
            <div className='col-12 col-sm-9 p-3'>
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
            <div className='col-12 col-sm-3 bg-light p-3 shadow'>
                <Text fontSize="2xl" className='fw-bold text-muted'>Order Summary</Text>
                <hr className='my-3' />
                <div className='d-flex justify-content-between'>
                    <Text fontSize="xl" className='fw-bold text-muted'>ITEMS {cart.length}</Text>
                    <Text fontSize="xl" className='fw-bold text-muted'>Rp. {totalProductPay().toLocaleString()}</Text>
                </div>
                <Text fontSize="xl" className='fw-bold text-muted my-3'>SHIPPING</Text>
                <select className='form-select'>
                    <option selected>Select shipping</option>
                    <option value='Reguler'>Reguler - Rp. {(totalProductPay() * 0.05).toLocaleString()}</option>
                    <option value='Next Day'>Next Day - Rp. {(totalProductPay() * 0.075).toLocaleString()}</option>
                    <option value='Same Day'>Same Day - Rp. {(totalProductPay() * 0.1).toLocaleString()}</option>
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
                <button className='btn btn-primary my-3 w-100' type='button'>
                    Checkout
                </button>
            </div>
        </div>
    </div>
}

export default CartPage;