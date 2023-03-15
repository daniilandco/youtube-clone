import { useContext, createContext, useEffect, useState } from 'react'
import {
    // GoogleProvider,
    signInWithPopup,
    // signInWithRedirect,
    signOut,
    // onAuthStateChanged,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'firebase/auth'

import { auth } from '../app/firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })
        return signInWithPopup(auth, provider)
    }

    const googleSignOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, googleSignOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
