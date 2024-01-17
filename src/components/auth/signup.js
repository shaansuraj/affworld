import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import { FaGoogle } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";

import CenterHeroSectionFrame from '../frame/hero-center'
import SectionHeader from '../section-header'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const isValidEmail = (email) => email.includes('@');
  const isFormValid = () => {
    if (!name || !email || !password || !username) {
      setError('All fields are required.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handleSignup = async (method) => {
    setError('');
    setSuccess('');
    if (method === 'email' && !isFormValid()) return;

    try {
      let userCredential;
      if (method === 'email') {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), { name, username, email });
      } else if (method === 'google') {
        const provider = new GoogleAuthProvider();
        userCredential = await signInWithPopup(auth, provider);
        // Checking if user already exists in Firestoreto avoid overwriting data
        const userRef = doc(db, 'users', userCredential.user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, { 
            name: userCredential.user.displayName, 
            email: userCredential.user.email,
          });
        } else {
          setError('You already have an account. Please login to proceed.');
          return;
        }
      }
      setSuccess('Signup successful!');
      navigate('/secrets');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <CenterHeroSectionFrame>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <SectionHeader topic='Signup' arrowNav='/' />
      <div className="text-center flex flex-col w-full mx-auto lg:py-10">
        <input
          className="input-ghost-secondary input text-yellow-400 my-3 mx-auto"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          className="input-ghost-secondary input text-yellow-400 my-3 w-96 mx-auto"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input-ghost-secondary input text-yellow-400 my-3 mx-auto"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
        <div className='flex justify-center my-3 mx-auto' >
          <button className='btn btn-outline-secondary mx-2 text-yellow-400' onClick={() => handleSignup('email')}><GoSignIn />Signup</button>
          <button className='btn btn-solid-secondary mx-2 text-yellow-400' onClick={() => handleSignup('google')}><FaGoogle /></button>
        </div>
        <small className='link link-warning mx-auto mt-3'>
          <Link to='/login'>  Already having an account, Login!</Link>
        </small>
      </div>
    </CenterHeroSectionFrame>
  );
}

export default Signup;
