import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart';
import { useSelector, useDispatch } from "react-redux";
import { setShowCart } from '../redux/reducers';
import { setQty } from '../redux/cartSlice';

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { showCart } = useSelector((state) => state.product);
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link to="/">HJC Headphones</Link>
      </p>
      <button type='button' className='cart-icon' onClick={()=>dispatch(setShowCart(true))}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{cartTotalQuantity}</span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar