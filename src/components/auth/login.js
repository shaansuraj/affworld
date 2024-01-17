import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from './AuthProvider';
import { PiSignIn } from "react-icons/pi";
import { FaGoogle } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";

import CenterHeroSectionFrame from '../frame/hero-center'
import SectionHeader from '../section-header'

function Login() {

  const {signInWithGoogle, currentUser} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) => email.includes('@');
  const isFormValid = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handlegoogleSignup = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("error while google auth: ", error);
    }
  }

  const handleLogin = async (method) => {
    setError('');

    try {
      if (method === 'email') {
        if (!isFormValid()) return;
        await signInWithEmailAndPassword(auth, email, password);
      } else if (method === 'google') {
        console.log("Attempting Google Signup");
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        console.log("Google Signup successful");
      }
     navigate('/secrets');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <CenterHeroSectionFrame>
      <SectionHeader topic='Login' arrowNav='/' />
      <div className="my-5">
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <div className="login-form">
          <input
            className="input-ghost-secondary input text-yellow-400 my-3 mx-auto"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="input-ghost-secondary input text-yellow-400 my-3 mx-auto"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <Link to='/recover-password'>
          <small className='text-left text-purple-500' >Forgot Password</small>
        </Link>
        <div className='flex justify-center my-3 mx-auto' >
          <button className='btn btn-outline-secondary mx-2 text-yellow-400' onClick={() => handleLogin('email')}><GoSignIn />Login</button>
          <button className='btn btn-solid-secondary mx-2 text-yellow-400' onClick={() => handleLogin('google')}><FaGoogle /></button>
        </div>
        <small className='link link-warning mx-auto mt-3'>
          <Link to='/signup' className='flex'>  Don't having an account, Signup! <PiSignIn className='my-auto mx-1' /></Link>
        </small>
      </div>
    </CenterHeroSectionFrame>
  );
}

export default Login;
