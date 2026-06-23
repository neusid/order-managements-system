import '../styles/api_parser_css.css'
import OrderManagementComponent from '../components/order_management_system/order_management'
import GapTopComponent from '../components/gap_top_component'
import HeaderOrderComponent from '../components/order_management_system/header_order_component'

const OrderManagementPage = () => {
    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>
                <HeaderOrderComponent title='Order Management' />
                <OrderManagementComponent />
                <GapTopComponent />
            </div>
        </>
    )
}

export default OrderManagementPage
