// src/AuthWrapper.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signInWithGoogle, signInWithEmail, registerWithEmail, logout } from "./auth";
import { signInWithGithub } from "./auth";



const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      // Handle successful login
    } catch (error) {
      console.error("Error with GitHub login:", error);
    }
  }

  const handleSignInWithEmail = async () => {
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Error signing in with email:", error);
    }
  };

  const handleRegisterWithEmail = async () => {
    try {
      await registerWithEmail(email, password);
    } catch (error) {
      console.error("Error registering with email:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignInWithEmail}>Sign In with Email</button>
        <button onClick={handleRegisterWithEmail}>Register with Email</button>
        <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        <button onClick={handleGithubLogin}>Sign In with GitHub</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </div>
  );
};

export default AuthWrapper;
