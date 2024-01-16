import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

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

  const handleLogin = async (method) => {
    setError('');
    if (!isFormValid()) return;

    try {
      if (method === 'email') {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (method === 'google') {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }
      // Redirect or handle successful login here
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={() => handleLogin('email')}>Login</button>
      </div>

      <div className="google-login">
        <button onClick={() => handleLogin('google')}>Login with Google</button>
      </div>
    </div>
  );
}

export default Login;
