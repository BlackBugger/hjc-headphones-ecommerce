/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaGooglePlusG, FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setShowForgotPassword } from '../redux/forgotPasswordReducer';
import FPModal from './ForgotPassword';
import { toast } from 'react-hot-toast';
import { firebase } from '../firebase'

const Login = () => {
  const { showForgotPassword } = useSelector((state) => state.showForgotPassword);
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(null);
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [disable, setDisable] = useState(true);

  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // EMAIL AND PASSWORD VALIDATION
  useEffect(() => {
    if (regEx.test(email)) {
      setIsValid(true)
      if (password === passwordCheck) {
        setDisable(false)
      }
    } else {
      setIsValid(false)
      setDisable(true)
    }
  }, [email]);
  // SIGNIN PASSWORD VALIDATION
  useEffect(() => {
    if (signInPassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, signInPassword]);

  // CREATE ACCOUNT VALIDATION
  useEffect(() => {
    if (password === passwordCheck) {
      if (isValid) {
        setDisable(false)
      }
    } else {
      setDisable(true)
    }
  }, [passwordCheck, isValid, password]);

  const handleSignInActive = () => {
    setBtnState(false);
    setDisable(true);
    setIsValid(false);
    setSignInPassword('');
    setPassword('');
    setEmail('');
  };
  const handleSignUpActive = () => {
    setBtnState(true);
    setDisable(true);
    setIsValid(false);
    setPassword('');
    setEmail('');
  };
  let activeClass = btnState ? 'right-panel-active' : '';

  const signIn = (e) => {
    // e.preventDefault();
    if (email.length === 0 || signInPassword.length === 0) {
      return
    } else {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, signInPassword).then(auth => {
        // cookie.set('access_token', auth.user.multiFactor.user.accessToken, { path: '/' })
        navigate('/')
      }).catch(() => {
        toast.error('there is no user with this email address');
        setSignInPassword('');
        setEmail('');
      })
    }

  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const google_provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(google_provider).then(auth => {
      toast.success(`Sign in successful, Hello ${auth.user.displayName}`, {
        duration: 3000,
      })
      navigate('/')
    }).catch((error) => {
      console.log(error.code);
      console.log(error.message);
      toast.error('User already exists with different sign-in credentials');
    })
  }

  const signInWithFacebook = (e) => {
    e.preventDefault();
    const facebook_provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(facebook_provider).then(auth => {
      toast.success(`Sign in successful, Hello ${auth.user.displayName}`, {
        duration: 3000,
      })
      navigate('/')
    }).catch((error) => {
      toast.error('User already exists with different sign-in credentials');
    })
  }

  const register = (e) => {
    if (email.length === 0 || password.length === 0) {
      return
    } else {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password).then((auth) => {
        if (auth) {
          navigate('/')
        }
      }).catch(error => alert(error.message))
    }
  };


  return (

    <div className="container-100">

      <div className={`container ${activeClass}`}>
        <div className="form-container sign-in-container">
          <form>
            <h2>Sign In</h2>
            <p className="iconss">
              <FaFacebookF className="icons" onClick={signInWithFacebook} />
              <FaGooglePlusG className="icons" onClick={signInWithGoogle} />
            </p>
            <span>or login with</span>
            <div className="inputBox">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <span>email</span>
            </div>
            <div className="inputBox">
              <input type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
              <span>password</span>
            </div>

            <button type="submit" disabled={disable} onClick={signIn} className="login-btn">
              LOGIN
            </button>
            <button type="button" onClick={() => dispatch(setShowForgotPassword(true))} className="clr-btn">
              forgot password?
            </button>
          </form>
        </div>
        <FPModal
          show={showForgotPassword}
          onHide={() => dispatch(setShowForgotPassword(false))}
        />
        <div className="form-container sign-up-container">
          <form>
            <h2>CREATE ACCOUNT</h2>
            <p className="iconss">
              <FaFacebookF className="icons" onClick={signInWithFacebook} />
              <FaGooglePlusG className="icons" onClick={signInWithGoogle} />
            </p>
            <span>or sign up with</span>
            <div className="inputBox">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <span>email</span>
            </div>
            <div className="inputBox">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span>password</span>
              {password &&
                <>
                  <input className='password' type="password" onChange={(e) => setPasswordCheck(e.target.value)} />
                  {passwordCheck && ((password === passwordCheck) ? <p className='password-check'><FaCheckCircle color='green' /></p> : <p className='password-check'><FaRegTimesCircle color='red' /></p>)}
                </>

              }

            </div>

            <button type="submit" disabled={disable} onClick={register} className="login-btn">SIGN UP</button>

          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Login now to start shopping!</p>
              <button type="button" className="ghost" id="signIn" onClick={() => handleSignInActive()}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello there!</h1>
              <p>Enter your details to start adding to cart!</p>
              <button type="button" className="ghost" id="signUp" onClick={() => handleSignUpActive()}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
