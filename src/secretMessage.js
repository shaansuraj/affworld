import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function SecretMessage() {
  const [secret, setSecret] = useState('');
  const [userSecret, setUserSecret] = useState(null);
  const [error, setError] = useState('');
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserSecret = async () => {
        try {
          const docRef = doc(db, 'secrets', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserSecret(docSnap.data().secret);
          }
        } catch (error) {
          setError('Error fetching secret: ' + error.message);
        }
      };
      fetchUserSecret();
    }
  }, [user, db]);

  const handlePostSecret = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to post a secret.');
      return;
    }
    try {
      await setDoc(doc(db, 'secrets', user.uid), { secret });
      setUserSecret(secret);
      setSecret('');
      setError('');
    } catch (error) {
      setError('Error posting secret: ' + error.message);
    }
  };

  const handleDeleteSecret = async () => {
    if (!user) {
      setError('You must be logged in to delete a secret.');
      return;
    }
    try {
      await deleteDoc(doc(db, 'secrets', user.uid));
      setUserSecret(null);
      setError('');
    } catch (error) {
      setError('Error deleting secret: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Post Your Secret</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handlePostSecret}>
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Type your secret here"
        />
        <button type="submit">Post Secret</button>
      </form>
      {userSecret && (
        <div>
          <h2>Your Secret</h2>
          <p>{userSecret}</p>
          <button onClick={handleDeleteSecret}>Delete My Secret</button>
        </div>
      )}
    </div>
  );
}

export default SecretMessage;
