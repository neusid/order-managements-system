import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    backgroundColor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
} as const;

type OrderStatus = 'New Order' | 'Shipped' | 'Canceled';

type OrderDataType = {
    orderId: number;
    orderNumber: number;
    status: OrderStatus;
    item: number;
    customerName: string;
    shippingService: string;
};


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


export default function ModalAddComponent({ state, eventOpen, eventClose, statusMap, shippingMap, order, setOrder }) {

    const HandleInput = (orderNumber: number, status: OrderStatus, item: number, customerName: string, shippingService: string) => {
        let newData = createData(order.length + 1, orderNumber, status, item, customerName, shippingService);
        setOrder([...order, newData]);
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
        eventClose();
    };

    return (
        <>
            <Button variant="contained" sx={{ color: '#ffffff', borderColor: '#ffffff' }} onClick={eventOpen}><AddIcon /></Button>
            <Modal
                open={state}
                onClose={eventClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
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
                                id="outlined-order-number"
                                label="Order Number"
                                name='orderNumber'
                                type='number'
                                style={{ width: 500 }}
                                required
                            />
                        </Grid>

                        <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <TextField
                                id="outlined-item"
                                label="Item"
                                type='number'
                                name='item'
                                style={{ width: 500 }}
                                required
                            />
                        </Grid>

                        <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <TextField
                                id="outlined-customer-name"
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
                </Box>
            </Modal>
        </>
    )
}
