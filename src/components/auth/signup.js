import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = getAuth();
  const db = getFirestore();

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
        // Check if user already exists in Firestore to avoid overwriting data
        const userRef = doc(db, 'users', userCredential.user.uid);
        // Further Firestore checks and setDoc operations can be added here
      }
      setSuccess('Signup successful!');
      // Redirect or update UI post successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div className="signup-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button onClick={() => handleSignup('email')}>Signup</button>
        <button onClick={() => handleSignup('`google')}>Signup with Google</button>
        </div>
        </div>
);
}

export default Signup;
