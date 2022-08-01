import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { useSelector } from 'react-redux';
import {
    Text, Button, ButtonGroup, Badge
} from '@chakra-ui/react';
import ModalTransaksi from '../Components/ModalTransaksi';

const Transactions = (props) => {

    const [data, setData] = React.useState([]);
    const [detail, setDetail] = React.useState(null);
    const [modal, setModal] = React.useState(false);
    const [filterStatus, setFilterStatus] = React.useState('ALL');

    const { id } = useSelector(({ userReducer }) => {
        return {
            id: userReducer.id
        }
    })

    const getData = async (filter) => {
        try {
            let res = await axios.get(API_URL + `/transactions?idUser=${id}${filter && filter != 'ALL' ? `&status=${filter}` : ''}`);
            setData(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData();
    }, [id]);

    const printTransaction = () => {
        return data.map((value, index) => {
            let badgeColor = value.status == "CANCEL" ? "red" : value.status == "PAID" ? "teal" : 'yellow'
            return <div className="shadow pb-3 rounded mt-3" key={value.id}>
                <div className="shadow-sm p-2 bg-primary rounded" style={{ color: "white" }}>
                    <span>{value.date} <Badge colorScheme={badgeColor}>{value.status}</Badge> </span>
                    <b style={{ marginLeft: 20 }}>{value.invoice}</b>
                </div>
                <div className="row p-3">
                    <div className="col-md-1">
                        <img src={value.detail[0].images} width="100%" />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid gray" }}>
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].name}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].price.toLocaleString()}</p>
                        <a className="text-muted" style={{ cursor: "pointer" }}>+{value.detail.length - 1} Produk Lainnya</a>
                    </div>
                    <div className="col-md-3">
                        <p className="text-muted">Total Payment</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {(value.total_price + value.ongkir).toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right" }} className='px-3'>
                    <ButtonGroup>
                        <Button colorScheme="red" type="button" variant='outline' onClick={() => onConfirm(value.id, 'CANCEL')} >Cancel Order</Button>
                        <Button colorScheme='teal' type='button' onClick={() => {
                            setDetail(value)
                            setModal(!modal)
                        }}>
                            Detail
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        })
    }

    const onFilter = (status) => {
        console.log(status)
        getData(status);
        setFilterStatus(status)
    }
    
    const onConfirm = async (id, confirm) => {
        try {
            let res = await axios.patch(API_URL + `/transactions/${id}`, {
                status: confirm
            })
            setModal(false);
            setDetail(null)
            setFilterStatus('ALL')
            getData();
        } catch (error) {
            console.log(error);
        }
    }


    return <div className='container main-page'>
        <div>
            <Text fontSize="4xl" className='fw-bold text-muted'>Transactions Page</Text>
            <p className='muted-color'>
                Pay transaction and <span className="main-color fw-bold"> get your product more easily.</span>
            </p>
        </div>
        <div className="btn-group mt-4 mb-2" role="group" aria-label="Basic example">
            <button type="button" onClick={(e) => onFilter(e.target.textContent)} className={`btn ${filterStatus == 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`}>ALL</button>
            <button type="button" onClick={(e) => onFilter(e.target.textContent)} className={`btn ${filterStatus == 'UNPAID' ? 'btn-primary' : 'btn-outline-primary'}`}>UNPAID</button>
            <button type="button" onClick={(e) => onFilter(e.target.textContent)} className={`btn ${filterStatus == 'PAID' ? 'btn-primary' : 'btn-outline-primary'}`}>PAID</button>
            <button type="button" onClick={(e) => onFilter(e.target.textContent)} className={`btn ${filterStatus == 'CANCEL' ? 'btn-primary' : 'btn-outline-primary'}`}>CANCEL</button>
        </div>
        <div className='my-3'>
            {printTransaction()}
        </div>
        {
            detail ?
                <ModalTransaksi
                    dataTransaksi={detail}
                    openModal={modal}
                    toggleModal={() => setModal(!modal)}
                    onConfirm={onConfirm}
                /> : null
        }
    </div>
}

export default Transactions;