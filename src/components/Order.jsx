import React from 'react'
import moment from 'moment'
import { urlFor } from '../client'
// import CurrencyFormat from 'react-currency-format';
const Order = ({ order }) => {
    return (
        <div className='order'>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
            <p className='order_id'>
                <small>{order.id}</small>
            </p>
            {order.data.cart?.map(item => (
                <>
                    <div className='product-container'>
                        <div className='product' key={item._id}>
                            <img src={urlFor(item?.image[0])} className='cart-product-image' alt={item.name} />
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>P{item.price}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            {/* <CurrencyFormat
            renderText={(value) => (
                <h3>Total: {value}</h3>
            )}
            decimalScale={2}
            value={order.data.amount/100}
            displayType={'text'}
            thousandSeparator={true}
            prefix={"P"}
            /> */}





        </div>
    )
}

export default Order