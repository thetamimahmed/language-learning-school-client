import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import axios from "axios";
import { GoogleAuthProvider } from "firebase/auth";



export const AuthContext = createContext()

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currenUser)=>{
            setUser(currenUser)
            setLoading(false)
            //get and set jwt
            if(currenUser){
                axios.post('http://localhost:5000/jwt', {email: currenUser.email})
                .then(data =>{
                    console.log(data.data)
                    localStorage.setItem("access-token", data.data)
                } )
            }
            else{
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        signUp,
        logIn,
        logOut,
        googleSignIn,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;