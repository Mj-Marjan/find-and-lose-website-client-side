import React, { useEffect, useState } from 'react';
import AuthContexts from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.inis';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        // Create a new user with email and password
       return createUserWithEmailAndPassword(auth,email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current User:', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }
    , []);

    const userInfo = {
        user,
        loading,
        createUser,
        signOutUser,
        signInWithGoogle,
        signInUser
    };
    return (
        <AuthContexts.Provider value={userInfo}>
            {children}
        </AuthContexts.Provider>
    );
};

export default AuthProvider;