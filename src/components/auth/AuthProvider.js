import React, { useContext, useState, useEffect } from "react";

// ** firebase
import { auth } from "../../firebaseConfig";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup
} from 'firebase/auth';
import "firebase/app";

// ** Create a context for authentication
const AuthContext = React.createContext();

// ** Custom hook to access the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const clearError = () => setError(null);

    // google signin
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            clearError();
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        signInWithGoogle,
        error,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}