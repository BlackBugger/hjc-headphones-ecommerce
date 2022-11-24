import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart';
import { useSelector, useDispatch } from "react-redux";
import { setShowCart } from '../redux/reducers';
import { auth } from '../firebase';

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { showCart } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.product);

const handleAuth =() => {
  if(user){
    auth.signOut();
  }
}

console.log(user);
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link to="/">HJC Headphones</Link>
      </p>
      <div className='actions'>
        <span>Hello, {user?.email}</span>
        <Link to={!user && '/login'}>
        <button type='button' className='login' onClick={handleAuth}>{user ? 'SIGN OUT' : 'LOGIN'}</button>
        </Link>
        <button type='button' className='cart-icon' onClick={() => dispatch(setShowCart(true))}>
          <AiOutlineShopping />
          <span className='cart-item-qty'>{cartTotalQuantity}</span>
        </button></div>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar