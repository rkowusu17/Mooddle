"use client";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
// import

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObject, setUserDataObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setisRegistered] = useState(false);

  //AUTH Handlers

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
      .then(() => alert("Password reset link sent to email"))
      .catch((error) => {
        console.error("Error sending resent email : ", error);
        alert(error.message);
      });
  }

  function logout() {
    setUserDataObject(null);
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        //Set user to our local context state.
        setLoading(true);
        setCurrentUser(user);

        if (!user) {
          console.log("No user found");
          return;
        }

        //If user exists, fetch user data from firebase database
        console.log("Fetching user data");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};

        if (docSnap.exists()) {
          console.log("found user data");
          firebaseData = docSnap.data();
          console.log(firebaseData);
        }

        setUserDataObject(firebaseData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDataObject,
    signUp,
    logout,
    login,
    resetPassword,
    loading,
    setUserDataObject,
    isRegistered,
    setisRegistered,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
