

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { setShowForgotPassword } from '../redux/forgotPasswordReducer';
import './forgotPassword.css'

const FPModal = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [disable, setDisable] = useState(true);
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

useEffect(() => {
    if(regEx.test(email)){
        setIsValid(true)
        setDisable(false)
            } else {
                setIsValid(false)
                setDisable(true)
            }
}, [email]);

    const handleForgotPassword = (e) => {

        if (email.length === 0) {
            return
        } else {
            e.preventDefault();
            if (isValid) {
                auth.sendPasswordResetEmail(email)
                    .then(() => {
                        dispatch(setShowForgotPassword(false))
                        toast.success('Reset Request Sent')
                    })
                    .catch((error) => {
                        setMessage('there is no user with this email address')
                    });
             
            } else {
                return
            }

        }

    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reset Password
                </Modal.Title>
            </Modal.Header>

            <div className='modal-container'>
                <form>
                    <div className="inputBox-ForgotPassword">
                        <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
                        <span>{message}</span>
                    </div>
                    <button type='submit' disabled={disable} className='btn-ForgotPassword' onClick={handleForgotPassword}>Send</button>
                </form>
            </div>

        </Modal>
    )
}

export default FPModal