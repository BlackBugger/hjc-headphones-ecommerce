import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { urlFor } from '../client'
import { useSelector, useDispatch } from "react-redux";
import { setShowCart } from '../redux/productReducer';
import { cartQty, removeFromCart } from '../redux/cartReducer'
import axios from 'axios'
import { db } from '../firebase'

import { EnableSuccessURL } from '../redux/successReducer'
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartRef = useRef();
  const { cartItems, cartTotalQuantity, cartTotalPrice } = useSelector((state) => state.cart)
  const { user, stripeData } = useSelector((state) => state.cart);

  const stripeJs = async () => await import("@stripe/stripe-js");

  const handleDecrement = (quantity) => {
    if (cartItems.cartQuantity - 1 < 1) return 1
    else { dispatch(cartQty({ type: "DECREMENT", item: quantity })) }
  }

  const handleRemove = (item) => {
    console.log(item);
    dispatch(removeFromCart(item))
    db
      .collection('users')
      .doc(user?.uid)
      .collection('cart')
      .doc(item._id).delete()

  }

  const api = axios.create({
    baseURL: "https://ecommerce-stripe-production.up.railway.app",
    Accept: "application/json",
  });

  const handleCheckout = async () => {
    const { loadStripe } = await stripeJs();
    const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const stripe = await stripePromise;
    const body = {
      cartItems: cartItems
    }
    const response = await api.post('/create-checkout-session', body)

    const data = await response.data;

    if (response.statusCode === 500) return;
    toast.loading('Redirecting..')

    db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(data.id)
      .set({
        cart: cartItems,
        amount: data.amount_total,
        created: data.created
      })

    dispatch(EnableSuccessURL(true));
   
    stripe.redirectToCheckout({ sessionId: data.id })
  }
  console.log('this is StripeData',stripeData);

  const handleLoginCheckout = () => {
    dispatch(setShowCart(false))
    navigate('/login')
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
                  <button type='button' className='remove-item' onClick={() => handleRemove(item)}>
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
              {/* <Link to={!user && '/login'}> */}
              <button type='button' className='btn' onClick={user ? handleCheckout : handleLoginCheckout}>
                {user ? 'PAY' : 'LOGIN TO PAY'}
              </button>
              {/* </Link> */}


            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart