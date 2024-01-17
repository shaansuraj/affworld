import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SecretMessageForm.css'; 

function SecretMessageForm() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserSecret = async () => {
        try {
          const docRef = doc(db, 'secrets', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSecret(docSnap.data().secret);
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
      navigate('/secrets');
    } catch (error) {
      setError('Error posting secret: ' + error.message);
    }
  };

  return (
    <div className="post-secret-form">
      <h1>Post Your Secret</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handlePostSecret}>
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Type your secret here"
          className="secret-textarea"
        />
        <button type="submit" className="submit-secret-button">Post Secret</button>
      </form>
    </div>
  );
}

export default SecretMessageForm;
