import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';

import anterajaLogo from '../../../src/assets/anteraja.svg';
import grabLogo from '../../../src/assets/grab.svg';
import tikiLogo from '../../../src/assets/tiki.svg';
import jneLogo from '../../../src/assets/jne.svg';
import jntLogo from '../../../src/assets/jnt.svg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function BasicModal({ state, eventOpen, eventClose, stateEditOrder, onConfirm }) {
    type OrderStatus = 'New Order' | 'Shipped' | 'Canceled';

    type OrderDataTypes = {
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

    let data = stateEditOrder as OrderDataTypes

    function createData(
        orderId: number,
        orderNumber: number,
        status: OrderStatus,
        item: number,
        customerName: string,
        shippingService: string,
    ): OrderDataTypes {
        return {
            orderId,
            orderNumber,
            status,
            item,
            customerName,
            shippingService,
        };
    }

    const HandleEventEditForm = (event: React.SubmitEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        let formValues = createData(Number(formData.get('orderId')), Number(formData.get('orderNumber')), formData.get('status') as OrderStatus, Number(formData.get('item')), formData.get('customerName') as string, formData.get('shippingService') as string);
        event.preventDefault();
        if (stateEditOrder) {
            onConfirm({
                ...stateEditOrder,
                ...formValues
            });
            eventClose();
        }
    }

    return (
        <div>
            <Button variant="outlined" sx={{ color: '#3085FE', borderColor: '#3085FE' }} onClick={eventOpen}><EditIcon /></Button>
            <Modal
                open={state}
                onClose={eventClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
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
                        onSubmit={HandleEventEditForm}

                    >
                        <Grid sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', width: '100%' }}>
                            <h1 style={{ color: 'gray', margin: 0 }}>Change Order</h1>
                        </Grid>

                        <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Order Number"
                                name='orderNumber'
                                type='number'
                                defaultValue={stateEditOrder.orderNumber}
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
                                defaultValue={stateEditOrder.item}
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
                                defaultValue={stateEditOrder.customerName}
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
                                defaultValue={stateEditOrder.status}
                                style={{ width: 240, height: 56 }}
                                helperText="Please select status"
                                required
                            >
                                {statusMap.map((option) => (
                                    <MenuItem key={option.value} defaultValue={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="outlined-select-shipping"
                                select
                                label="Shipping Service"
                                name='shippingService'
                                defaultValue={stateEditOrder.shippingService}
                                style={{ width: 240, height: 56 }}
                                helperText="Please select shipping"
                                required
                            >
                                {shippingMap.map((option) => (
                                    <MenuItem key={option.value} defaultValue={option.value} style={{ alignItems: 'center' }}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px', width: '100%' }}>
                            <Button type='submit' variant="outlined" sx={{ color: '#3085FE', borderColor: '#3085FE', width: 500, height: 56 }}>
                                Change Order
                            </Button>
                        </Grid>
                    </Grid>
                </>
            </Modal>
        </div>
    );
}