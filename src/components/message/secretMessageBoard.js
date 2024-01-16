import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function SecretMessageBoard() {
  const [secrets, setSecrets] = useState([]);
  const [error, setError] = useState('');
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const q = query(collection(db, 'secrets'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const secretsArray = [];
      querySnapshot.forEach((doc) => {
        secretsArray.push({ ...doc.data(), id: doc.id });
      });
      setSecrets(secretsArray);
    }, (error) => {
      setError('Error fetching secrets: ' + error.message);
    });
    return () => unsubscribe();
  }, [db]);

  const handleDeleteSecret = async (secretId) => {
  if (!auth.currentUser) {
  setError('You must be logged in to delete a secret.');
  return;
  }
  try {
  await deleteDoc(doc(db, 'secrets', secretId));
  } catch (error) {
  setError('Error deleting secret: ' + error.message);
  }
  };
  
  return (
  <div>
  <h1>Secret Messages</h1>
  {error && <div style={{ color: 'red' }}>{error}</div>}
  <div className="secrets-list">
  {secrets.map((secret) => (
  <div key={secret.id} className="secret-message">
  <p>{secret.secret}</p>
  {auth.currentUser && auth.currentUser.uid === secret.id && (
  <button onClick={() => handleDeleteSecret(secret.id)}>Delete My Secret</button>
  )}
  </div>
  ))}
  </div>
  </div>
  );
  }
  
  export default SecretMessageBoard;
