import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let x = await createUserWithEmailAndPassword(auth, email, password);
      x = x.user.uid;

      //   setUser(x);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="auth-container">
      <h1 className="sign-in">Sign Up</h1>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="auth-btn-container">
          <button onClick={handleSignIn} className="btn">
            Create A User
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
