import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // registation
  const loginHandle = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login
  const registerHandle = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logoutHandle = () => {
    return signOut(auth);
  };

  // login with google
  const googleLogin = () =>{
    return signInWithPopup(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loginHandle,
    registerHandle,
    logoutHandle,
    googleLogin,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
