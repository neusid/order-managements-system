import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import '../../App.css';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import HandshakeIcon from '@mui/icons-material/Handshake';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';

import anterajaLogo from '../../../src/assets/anteraja.svg';
import grabLogo from '../../../src/assets/grab.svg';
import tikiLogo from '../../../src/assets/tiki.svg';
import jneLogo from '../../../src/assets/jne.svg';
import jntLogo from '../../../src/assets/jnt.svg';

import BasicModal from './modal_edit_component';
import ModalAddComponent from './modal_add_component';

const OrderManagementComponent = () => {

    type OrderStatus = 'New Order' | 'Shipped' | 'Canceled';

    type OrderDataType = {
        orderId: number;
        orderNumber: number;
        status: OrderStatus;
        item: number;
        customerName: string;
        shippingService: string;
    };

    const statusMap = [
        { value: 'New Order', label: 'New Order' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Canceled', label: 'Canceled' }
    ];

    const shippingMap = [
        { value: 'JNE Regular', label: ' JNE Regular', icon: jneLogo },
        { value: 'Sicepat Gokil', label: ' Sicepat Gokil', icon: tikiLogo },
        { value: 'Grab Instant', label: ' Grab Instant', icon: grabLogo },
        { value: 'J&T Express', label: ' J&T Express', icon: jntLogo },
        { value: 'Anteraja', label: ' Anteraja', icon: anterajaLogo }
    ];

    function createData(
        orderId: number,
        orderNumber: number,
        status: OrderStatus,
        item: number,
        customerName: string,
        shippingService: string,
    ): OrderDataType {
        return { orderId, orderNumber, status, item, customerName, shippingService };
    }

    const rows = [
        createData(1, 1001, 'New Order', 3, 'Budi Santoso', 'JNE Regular'),
        createData(2, 1002, 'Shipped', 1, 'Sicepat Gokil', 'Sicepat Gokil'),
        createData(3, 1003, 'Canceled', 5, 'Grab Instant', 'Grab Instant'),
        createData(4, 1004, 'Shipped', 2, 'Dewi Lestari', 'J&T Express'),
        createData(5, 1005, 'New Order', 1, 'Rian Hidayat', 'Anteraja'),
        createData(6, 1006, 'New Order', 8, 'Jane Doe', 'JNE Regular')
    ];

    const [Order, setOrder] = useState<OrderDataType[]>(rows);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    const HandleInput = (orderNumber: number, status: OrderStatus, item: number, customerName: string, shippingService: string) => {
        let newData = createData(Order.length + 1, orderNumber, status, item, customerName, shippingService);
        setOrder([...Order, newData]);
    };

    const HandleEventForm = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();

        HandleInput(
            Number(formData.get('orderNumber')),
            formData.get('status') as OrderStatus,
            Number(formData.get('item')),
            String(formData.get('customerName')),
            formData.get('shippingService') as string
        );
    };

    const HandleEdit = (newData: OrderDataType) => {
        const updatedOrder = Order.map((item) =>
            item.orderId === newData.orderId ? newData : item
        );
        setOrder(updatedOrder);
    };

    const HandleDelete = (id: number) => {
        let newRows = Order.filter(item => item.orderId !== id);
        setOrder(newRows);
    };

    const modalSection = {
        width: '90%',
        padding: '50px',
        height: '100px',
        marginTop: '10px',
    }

    const modalAddStyle = {
        display: 'flex',
        justifyContent: 'flex-start'
    }

    const shippingTableStyle = {
        justifyContent: 'flex-center'
    }

    const imageTabelStyle = {
        width: '20px'
    }

    return (
        <>
            <section id="spacer" style={modalSection}>
                <div style={modalAddStyle}>
                    <ModalAddComponent state={openAdd} eventOpen={handleOpenAdd} eventClose={handleCloseAdd} statusMap={statusMap} shippingMap={shippingMap} order={Order} setOrder={setOrder} />
                </div>
                <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Id</TableCell>
                                <TableCell align="right">Order Number</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Item</TableCell>
                                <TableCell align="right">Customer Name</TableCell>
                                <TableCell align="right">Shipping Service</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Order.map((row) => (
                                <TableRow key={row.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{row.orderId}</TableCell>
                                    <TableCell align="right">{row.orderNumber}</TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        {row.status.match('New Order') ? <Chip icon={<LocalShippingIcon />} sx={{ borderColor: '#3085FE', color: '#3085FE', '& .MuiChip-icon': { color: '#3085FE' } }} label={row.status} variant="outlined" /> : <></>}
                                        {row.status.match('Shipped') ? <Chip icon={<HandshakeIcon />} sx={{ borderColor: '#A3D139', color: '#A3D139', '& .MuiChip-icon': { color: '#A3D139' } }} label={row.status} variant="outlined" /> : <></>}
                                        {row.status.match('Canceled') ? <Chip icon={<DoDisturbAltIcon />} sx={{ borderColor: '#FF7F74', color: '#FF7F74', '& .MuiChip-icon': { color: '#FF7F74' } }} label={row.status} variant="outlined" /> : <></>}
                                    </TableCell>
                                    <TableCell align="right">{row.item}</TableCell>
                                    <TableCell align="right">{row.customerName}</TableCell>
                                    <TableCell align="right" style={shippingTableStyle}>
                                        {row.shippingService.match('JNE Regular') ? <><img src={jneLogo} alt="" style={imageTabelStyle} /> {row.shippingService}</> : <></>}
                                        {row.shippingService.match('Sicepat Gokil') ? <><img src={anterajaLogo} style={imageTabelStyle} alt="" /> {row.shippingService}</> : <></>},
                                        {row.shippingService.match('Grab Instant') ? <><img src={grabLogo} alt="" style={imageTabelStyle} /> {row.shippingService}</> : <></>},
                                        {row.shippingService.match('J&T Express') ? <><img src={jntLogo} alt="" style={imageTabelStyle} /> {row.shippingService}</> : <></>},
                                        {row.shippingService.match('Anteraja') ? <><img src={anterajaLogo} alt="" style={imageTabelStyle} /> {row.shippingService}</> : <></>}
                                    </TableCell>
                                    <TableCell align="right" style={{ width: '150px' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <BasicModal
                                                state={selectedOrderId === row.orderId}

                                                eventOpen={() => setSelectedOrderId(row.orderId)}
                                                eventClose={() => setSelectedOrderId(null)}

                                                stateEditOrder={row}
                                                onConfirm={(updatedData) => {
                                                    HandleEdit(updatedData);
                                                    setSelectedOrderId(null);
                                                }}
                                            />

                                            <Button variant="outlined" sx={{ color: '#FF7F74', borderColor: '#FF7F74' }} onClick={() => HandleDelete(row.orderId)}>
                                                <DeleteForeverIcon />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </>
    );
};

export default OrderManagementComponent;