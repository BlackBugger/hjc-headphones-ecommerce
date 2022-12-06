import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart';
import { useSelector, useDispatch } from "react-redux";
import { setShowCart } from '../redux/productReducer';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showNav, setshowNav] = useState('close');
  const navRef = useRef();

  const showNavbar = () => {

    if (showNav === 'open') {
      navRef.current.classList.remove("active_nav")
      setshowNav('close')
    } else {
      navRef.current.classList.add("active_nav");
      setshowNav('open')
    }

  }





  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { showCart } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className='navbar-container'>
      <div className='main-nav'>
        <p className='logo'>
          <Link to="/">HJC Headphones</Link>
        </p>
        <div className='actions' ref={navRef}>
          <span>Hello, {!user ? 'Guest' : (user.name || user.email)}</span>
          <Link to={!user && '/login'}>
            <button type='button' className='login' onClick={handleAuth}>{user ? 'SIGN OUT' : 'LOGIN'}</button>
          </Link>
          <button type='button' className='order-btn' onClick={() => navigate('/orders')}>{user && 'ORDERS'}</button>
          <button type='button' className='cart-icon' onClick={() => dispatch(setShowCart(true))}>
            <AiOutlineShopping />
            <span className='cart-item-qty'>{cartTotalQuantity}</span>
          </button>

        </div>
        <span className="nav-icon" onClick={showNavbar}>&#9776;</span>
        {showCart && <Cart />}</div>

    </div>
  )
}

export default Navbar