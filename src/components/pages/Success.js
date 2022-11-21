import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {BsBagCheckFill} from 'react-icons/bs'
import { useDispatch } from "react-redux";
import {setCartTotalPrice} from '../../redux/cartSlice'
import { runFireworks } from '../Layout/confetti';

const Success = () => {


const dispatch = useDispatch();

useEffect(() => {
localStorage.clear();
dispatch(setCartTotalPrice(0))


runFireworks();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email inbox for receipt.</p>
            <p className='description'>If you have any question, please email
            <a className='email' href='mailto:hakkingtosh@gmail.com'>
                hakkingtosh@gmail.com
                </a></p>
<Link to='/'>
    <button type='button' width="300px" className='btn'>Continue Shopping</button>
</Link>
        </div>
    </div>
  )
}

export default Success