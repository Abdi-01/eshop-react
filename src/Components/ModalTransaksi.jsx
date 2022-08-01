import React from 'react';
import {
    Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Badge
} from '@chakra-ui/react'

const ModalTransaksi = (props) => {
    const { dataTransaksi } = props;
    const printDetail = () => {
        return dataTransaksi.detail.map((value, index) => {
            return <Box>
                <div className="row p-2">
                    <div className="col-md-2">
                        <img src={value.images} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h6 style={{ fontWeight: "bolder", margin: 0 }}>{value.name}</h6>
                        <p className="text-muted">{value.qty} x Rp. {value.price.toLocaleString()}</p>
                    </div>
                    <div className="col-md-4">
                        <p className="m-0">Sub. Total</p>
                        <h6 style={{ fontWeight: "bolder", margin: 0 }}>Rp. {(value.qty * value.price).toLocaleString()}</h6>
                    </div>
                </div>
            </Box>
        })
    }

    const totalBarang = () => {
        let total = 0
        dataTransaksi.detail.forEach((item) => {
            total += item.qty
        })
        return total
    }
    return (
        <Modal isOpen={props.openModal}
            onClose={props.toggleModal} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="d-block shadow-sm">
                    <div style={{ textAlign: "center" }}>
                        <h4 style={{ fontWeight: "700" }}>Detail Transaction</h4>
                    </div>
                </ModalHeader>
                <ModalBody>
                    {
                        dataTransaksi ?
                            <div className="row">
                                <div className="col-md-8 px-0" style={{ backgroundColor: "#F3F4F5" }}>
                                    <div className="card p-4 rounded" style={{ border: "none" }}>
                                        <Badge className='fw-bold' fontSize='xl' colorScheme={props.dataTransaksi.status == "CANCEL" ? "red" : props.dataTransaksi.status == "PAID" ? "teal" : 'yellow'}>{props.dataTransaksi.status}</Badge>
                                        <span className="d-flex justify-content-between">
                                            <p>No. Invoice</p>
                                            <p style={{ fontWeight: "bold", color: "#3498db" }}>{props.dataTransaksi.invoice}</p>
                                        </span>
                                        <span className="d-flex justify-content-between">
                                            <p>Date</p>
                                            <p>{props.dataTransaksi.date}</p>
                                        </span>
                                    </div>
                                    <div className="card px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                                        <p style={{ fontWeight: "bold" }}>Detail</p>
                                        <div style={{ height: "30vh", overflow: "auto", overflowX: "hidden" }}>
                                            {printDetail()}
                                        </div>
                                    </div>
                                    <div className="card px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                                        <p style={{ fontWeight: "bold" }}>Payment</p>
                                        <span className="d-flex justify-content-between">
                                            <p>Total Price ({totalBarang()} item)</p>
                                            <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {dataTransaksi.total_price.toLocaleString()}</p>
                                        </span>
                                        <span className="d-flex justify-content-between">
                                            <p>Shipping</p>
                                            <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {dataTransaksi.ongkir.toLocaleString()}</p>
                                        </span>
                                        <span className="d-flex justify-content-between">
                                            <p>Total Payment</p>
                                            <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {(dataTransaksi.total_price + dataTransaksi.ongkir).toLocaleString()}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4 p-3">
                                    <Button className="my-2" size="lg" colorScheme='teal' style={{ width: "100%" }} onClick={()=>props.onConfirm(dataTransaksi.id,'PAID')}>Pay</Button>
                                    <Button variant='outline' colorScheme='red' size="lg" style={{ width: "100%" }} type="button" onClick={()=>props.onConfirm(dataTransaksi.id,'CANCEL')}>Cancel Order</Button>
                                </div>
                            </div>
                            : <p style={{ textAlign: "center" }}> No Data ⚠️</p>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
};

export default ModalTransaksi;