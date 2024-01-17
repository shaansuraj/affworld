import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import './SecretMessageBoard.css'; 

function SecretMessageBoard() {
  const [secrets, setSecrets] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const q = query(collection(db, 'secrets'));
    const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
      const secretsArray = [];
      querySnapshot.forEach((doc) => {
        secretsArray.push({ ...doc.data(), id: doc.id });
      });
      setSecrets(secretsArray);
    }, (error) => {
      setError('Error fetching secrets: ' + error.message);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [db, auth]);

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
    <div className="secret-message-board">
      <h1>Secret Messages</h1>
      {error && <div className="error-message">{error}</div>}
      {isLoggedIn && (
        <button
          onClick={() => navigate('/post-secret')}
          className="post-secret-button"
        >
          Post a Secret
        </button>
      )}
      <div className="secrets-list">
        {secrets.map((secret) => (
          <div key={secret.id} className="secret-message">
            <p>{secret.secret}</p>
            {auth.currentUser && auth.currentUser.uid === secret.id && (
              <button onClick={() => handleDeleteSecret(secret.id)} className="delete-secret-button">
                Delete My Secret
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecretMessageBoard;
