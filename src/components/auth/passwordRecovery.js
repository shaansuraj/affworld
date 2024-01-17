import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import CenterHeroSectionFrame from '../frame/hero-center'
import SectionHeader from '../section-header'

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const isValidEmail = (email) => email.includes('@');
  const validateEmail = () => {
    if (!email) {
      setError('Email is required.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validateEmail()) return;

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError('Failed to send password reset email: ' + error.message);
    }
  };

  return (
    <CenterHeroSectionFrame className="password-recovery-container">
      <SectionHeader topic='Forgot Password' arrowNav='/login' />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
      <form onSubmit={handlePasswordReset} className='my-5'>
        <input
          className="input-ghost-secondary input text-yellow-400 my-3 mx-auto"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        {/* <button type="submit">Reset Password</button> */}
        <button className='btn btn-outline-secondary mx-2 text-yellow-400'>Reset Password</button>
      </form>
    </CenterHeroSectionFrame>
  );
}

export default PasswordRecovery;
