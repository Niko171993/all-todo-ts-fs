import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let x = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="auth-container">
      <h1 className="sign-in">Sign In</h1>
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
            Sign In
          </button>
          <Link to="/signup">
            <button className="btn">Sign Up</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
