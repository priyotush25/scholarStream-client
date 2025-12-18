/**
 * Authentication Context Provider
 *
 * Manages global authentication state using Firebase Auth.
 * Syncs authenticated users with backend MongoDB and handles JWT tokens.
 * Provides auth methods to all child components via React Context.
 *
 * @module context/AuthContext
 */

import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axios from "../api/axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  /**
   * Create new user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Firebase auth promise
   */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * Sign in existing user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Firebase auth promise
   */
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Sign in with Google popup
   * @returns {Promise} Firebase auth promise
   */
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  /**
   * Sign out current user
   * @returns {Promise} Firebase auth promise
   */
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  /**
   * Update user profile (name and photo)
   * @param {string} name - Display name
   * @param {string} photo - Photo URL
   * @returns {Promise} Firebase auth promise
   */
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  /**
   * Fetch user data from backend
   * @param {string} email - User email
   */
  const fetchUserData = (email) => {
    axios
      .get(`/users/${email}`)
      .then((userRes) => {
        // Merge Firebase user with database user (includes role and _id)
        setUser((prev) => {
          const merged = { ...prev, ...userRes.data };
          return merged;
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  /**
   * Firebase auth state observer
   * Runs on mount and whenever auth state changes
   * Fetches JWT from backend and merges user role from database
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔍 AuthContext - Firebase user:", currentUser?.email);
      setUser(currentUser);

      if (currentUser) {
        // Request JWT token from backend
        const userInfo = { email: currentUser.email };
        axios
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data.token) {
              
              console.log("✅ JWT token obtained");
              
              localStorage.setItem("token", res.data.token);
              fetchUserData(currentUser.email);
            }
          })
          .catch((err) => {
            console.error("❌ JWT fetch failed", err);
            setLoading(false);
          });
      } else {
        // User logged out - clear token
        localStorage.removeItem("token");
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logout,
    updateUserProfile,
    fetchUserData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthProvider;
