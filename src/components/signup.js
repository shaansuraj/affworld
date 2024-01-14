import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  const validateForm = () => {
    if (!name || !email || !password || !username) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), { name, username, email });
      setSuccess('Signup successful!');
      // Reset form or redirect user
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');
    try {
      const result = await signInWithPopup(auth, provider);
        const { user } = result;
      // Check if user already exists in Firestore, if not, save their info
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          username: '', // Username can be added later as it's not provided by Google
        });
      }

      setSuccess('Signup successful with Google!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleEmailSignup}>
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
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleGoogleSignup}>Signup with Google</button>
    </div>
  );
}


export default Signup;
