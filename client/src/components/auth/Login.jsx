import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
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
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="authForm">
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
        <button type="submit" className="authBtn">Login</button>
      </form>

      <p className="divider">OR</p>

      <button onClick={handleGoogleLogin} className="googleBtn">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
        Continue with Google
      </button>

      <p className="switchText">
        Don’t have an account? <span onClick={() => navigate("/signup")}>Signup</span>
      </p>
    </div>
  );
}

export default Login;
