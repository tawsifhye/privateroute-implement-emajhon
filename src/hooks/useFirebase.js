import {useEffect, useState} from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init'

initializeAuthentication()

const useFirebase = () =>{
    const [user, setUser] = useState({});
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
   
    const signInUsinggoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then(result =>{
            console.log(result.user);
        })
    }

    const logOut = () =>{
        signOut(auth)
        .then(() => {
            setUser({});
          }).catch((error) => {
            // An error happened.
          });
    }
    //observe whether user auth state changed or not
    useEffect( () =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
          });
    },[])

    return {
        user,
        signInUsinggoogle,
        logOut
    }
}

export default useFirebase;