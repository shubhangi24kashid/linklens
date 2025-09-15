import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authContainer">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="authForm">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="authBtn">Signup</button>
      </form>

      <p className="divider">OR</p>

      <button onClick={handleGoogleSignup} className="googleBtn">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
        Continue with Google
      </button>

      <p className="switchText">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}

export default Signup;
