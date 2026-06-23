import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StatusComponent from './status_component';
import React, { useState } from 'react'
import '../../App.css'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';

import { SiGojek } from 'react-icons/si';
import anterajaLogo from '../../../src/assets/anteraja.svg';
import grabLogo from '../../../src/assets/grab.svg';
import tikiLogo from '../../../src/assets/tiki.svg';
import jneLogo from '../../../src/assets/jne.svg';
import jntLogo from '../../../src/assets/jnt.svg';

import BasicModal from './modal_edit_component';

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
        {
            value: 'New Order',
            label: 'New Order',
        },
        {
            value: 'Shipped',
            label: 'Shipped',
        },
        {
            value: 'Canceled',
            label: 'Canceled',
        }
    ];

    const shippingMap = [
        {
            value: 'JNE Regular',
            label: ' JNE Regular',
            icon: jneLogo
        },
        {
            value: 'Sicepat Gokil',
            label: ' Sicepat Gokil',
            icon: tikiLogo
        },
        {
            value: 'Grab Instant',
            label: ' Grab Instant',
            icon: grabLogo
        },
        {
            value: 'J&T Express',
            label: ' J&T Express',
            icon: jntLogo
        },
        {
            value: 'Anteraja',
            label: ' Anteraja',
            icon: anterajaLogo
        }
    ];

    function createData(
        orderId: number,
        orderNumber: number,
        status: OrderStatus,
        item: number,
        customerName: string,
        shippingService: string,
    ): OrderDataType {
        return {
            orderId,
            orderNumber,
            status,
            item,
            customerName,
            shippingService,
        };
    }

    const rows = [
        createData(1, 1001, 'New Order', 3, 'Budi Santoso', 'JNE Regular'),
        createData(2, 1002, 'Shipped', 1, 'Siti Aminah', 'Sicepat Gokil'),
        createData(3, 1003, 'Canceled', 5, 'Andi Wijaya', 'Grab Instant'),
        createData(4, 1004, 'Shipped', 2, 'Dewi Lestari', 'J&T Express'),
        createData(5, 1005, 'New Order', 1, 'Rian Hidayat', 'Anteraja'),
        createData(6, 1006, 'New Order', 8, 'Jane Doe', 'JNE Regular')
    ];

    const [Order, setOrder] = useState<OrderDataType[]>(rows);

    const HandleInput = (orderNumber: number, status: OrderStatus, item: number, customerName: string, shippingService: string,) => {
        let newData = createData(Order.length + 1, orderNumber, status, item, customerName, shippingService)
        setOrder([...Order, newData]);
    }

    const HandleEventForm = (event: React.SubmitEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);

        event.preventDefault()

        HandleInput(Number(formData.get('orderNumber')), formData.get('status') as OrderStatus, Number(formData.get('item')), String(formData.get('customerName')), formData.get('shippingService') as string);
    }

    const HandleDelete = (id: number) => {
        let newRows = Order.filter(item => item.orderId !== id);
        console.log(newRows);
        setOrder(newRows)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editOrder, setEditOrder] = useState<OrderDataType>();


    return (
        <>
            <section id="spacer">
                <TableContainer component={Paper}>
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
                                    <TableCell align="right">{row.shippingService}</TableCell>
                                    <TableCell align="right" style={{ width: '150px' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <BasicModal state={open} eventOpen={handleOpen} eventClose={handleClose} stateEditOrder={createData(row.orderId, row.orderNumber, row.status, row.item, row.customerName, row.shippingService)} onConfirm={setEditOrder} />
                                            <Button variant="outlined" sx={{ color: '#FF7F74', borderColor: '#FF7F74' }} onClick={() => HandleDelete(row.orderId)}><DeleteForeverIcon /> </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <div style={{ height: '50px', }}></div>
            <section
                id="spacer"
                style={{
                    width: '100%',
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <Grid
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        backgroundColor: 'white',
                        width: '550px',
                        borderRadius: '10px',
                        padding: '24px 20px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    container
                    autoComplete="off"
                    onSubmit={HandleEventForm}
                >
                    <Grid sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', width: '100%' }}>
                        <h1 style={{ color: 'gray', margin: 0 }}>New Order</h1>
                    </Grid>

                    <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Order Number"
                            name='orderNumber'
                            type='number'
                            style={{ width: 500 }}
                            required
                        />
                    </Grid>

                    <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Item"
                            type='number'
                            name='item'
                            style={{ width: 500 }}
                            required
                        />
                    </Grid>

                    <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Customer Name"
                            type='text'
                            name='customerName'
                            style={{ width: 500 }}
                            required
                        />
                    </Grid>

                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '500px', margin: '0 auto' }}>
                        <TextField
                            id="outlined-select-status"
                            select
                            label="Status"
                            name='status'
                            style={{ width: 240, height: 56 }}
                            helperText="Please select status"
                            required
                        >
                            {statusMap.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-select-shipping"
                            select
                            label="Shipping Service"
                            name='shippingService'
                            style={{ width: 240, height: 56 }}
                            helperText="Please select shipping"
                            required
                        >
                            {shippingMap.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{ alignItems: 'center' }}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px', width: '100%' }}>
                        <Button type='submit' variant="outlined" sx={{ color: '#3085FE', borderColor: '#3085FE', width: 500, height: 56 }}>
                            New Order
                        </Button>
                    </Grid>
                </Grid>
            </section>
        </>
    )
}

export default OrderManagementComponent;