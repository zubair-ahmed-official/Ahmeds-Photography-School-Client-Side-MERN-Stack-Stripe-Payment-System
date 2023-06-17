
// import React from 'react';

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loggedUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = (GoogleProvider) => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
    return updateProfile(auth.signedUser, {
        displayName: name, photoURL: photo
    });
}

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, signedUser => {
            console.log("Logged user", signedUser);
            setUser(signedUser);
            setLoading(false)

            if(signedUser){
                axios.post('https://12th-assignment-server-side.vercel.app/jwt', {email: signedUser.email})
                .then(data =>{
                    // console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
            }

        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = { user, loading, createUser, loggedUser, googleLogin, logOut , updateUserProfile};
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProviders;
