import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { urlFor } from '../client'
import { useSelector, useDispatch } from "react-redux";
import { setShowCart } from '../redux/reducers';
import { cartQty, removeFromCart } from '../redux/cartSlice'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

const Cart = () => {

  const dispatch = useDispatch();
  const cartRef = useRef();
  const { cartItems, cartTotalQuantity, cartTotalPrice } = useSelector((state) => state.cart)

  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);


  const handleDecrement = (quantity) => {
    if (cartItems.cartQuantity - 1 < 1) return 1
    else { dispatch(cartQty({ type: "DECREMENT", item: quantity })) }
  }

  const api = axios.create({
    baseURL: "https://ecommerce-stripe-production.up.railway.app",
    Accept: "application/json",
  });

  const handleCheckout = async () => {

    const stripe = await stripePromise;
    const body = {
      cartItems: cartItems
  }
    const response = await api.post('/create-checkout-session', body)
  //  const response = await fetch('http://localhost:4242/create-checkout-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: {
  //       cartItems: cartItems
  //     },
  //   });

  
  if (response.statusCode === 500) return;
    toast.loading('Redirecting..')
 
    const data = await response.data;
stripe.redirectToCheckout({sessionId: data.id})
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => dispatch(setShowCart(false))}>
          <AiOutlineLeft />
          <span>Your Cart</span>
          <span className='cart-num-items'>({cartTotalQuantity} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to="/">
              <button type='button' onClick={() => dispatch(setShowCart(false))} className='btn'>
                Continue Shopping
              </button>

            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image' alt={item.name} />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>P{item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => handleDecrement(item)}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {item.cartQuantity}
                      </span>
                      <span className="plus" onClick={() => dispatch(cartQty({ type: "INCREMENT", item: item }))}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => dispatch(removeFromCart(item))}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>P{cartTotalPrice}</h3>
            </div>
            <div className='btn-container'>

              <button type='button' className='btn' onClick={handleCheckout}>
                Pay
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart