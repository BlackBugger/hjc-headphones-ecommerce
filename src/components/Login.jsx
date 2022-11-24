import React, { useState } from 'react';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
import { auth } from '../firebase';
const Login = () => {
  const [btnState, setBtnState] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const handleSignInActive = () => {
    setBtnState(false);
  };
  const handleSignUpActive = () => {
    setBtnState(true);
  };
  let activeClass = btnState ? 'right-panel-active' : '';

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password).then(auth => {
        navigate('/')
    }).catch(error => alert(error.message))
  };

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
        console.log(auth);
        if(auth){
            navigate('/')
        }
    }).catch(error => alert(error.message))
  };

  return (
    <div className="container-100">
      <div className={`container ${activeClass}`}>
        <div className="form-container sign-in-container">
          <form>
            <h2>Sign In</h2>
            <p className="iconss">
              <FaFacebookF className="icons" />
              <FaGooglePlusG className="icons" />
            </p>
            <span>or login with</span>
            <div className="inputBox">
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required="required" />
              <span>email</span>
            </div>
            <div className="inputBox">
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required="required" />
              <span>password</span>
            </div>

            <button type="submit" onClick={signIn} className="login-btn">
              LOGIN
            </button>
            <button type="button" className="clr-btn">
              forgot password?
            </button>
          </form>
        </div>

        <div className="form-container sign-up-container">
          <form>
            <h2>CREATE ACCOUNT</h2>
            <p className="iconss">
              <FaFacebookF className="icons" />
              <FaGooglePlusG className="icons" />
            </p>
            <span>or sign up with</span>
            <div className="inputBox">
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required="required" />
              <span>email</span>
            </div>
            <div className="inputBox">
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required="required" />
              <span>password</span>
            </div>

            <button type="submit" onClick={register} className="login-btn">SIGN UP</button>
            <button  className="clr-btn">
              forgot password?
            </button>
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
