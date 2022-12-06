import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsBagCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart} from '../../redux/cartReducer';
import { runFireworks } from '../Layout/confetti';

const Success = () => {
  const { user, stripeData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(stripeData);

    // db.collection('users').doc(user?.uid).collection('orders').doc(stripeData.id).set({
    //   cart: cartItems,
    //   amount: stripeData.amount_total,
    //   created: stripeData.created,
    // });

    dispatch(deleteCart());

    runFireworks();

    //eslint-disable-next-line
  }, [user]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for receipt.</p>
        <p className="description">
          If you have any question, please email
          <a className="email" href="mailto:hakkingtosh@gmail.com">
            hakkingtosh@gmail.com
          </a>
        </p>
        <Link to="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
