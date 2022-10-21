import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../../components/firebase/firebase-config';
export const UserInformationContext = createContext()
const auth = getAuth(app)
const UserInformContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email,password)
    }
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() =>{
       const unsubscribe =  onAuthStateChanged(auth, loggedUser =>{
            if(loggedUser){
                const uid = loggedUser.uid
                setLoading(false)
                setUser(loggedUser)
            }else{
                setUser({})
                setLoading(false)
            }
        })

        return () => unsubscribe()
    },[])
    const userInformation = {user, loading, createUser, loginUser, logOut}
    return (
        <UserInformationContext.Provider value={userInformation}>
                {children}
        </UserInformationContext.Provider>
    );
};

export default UserInformContext;