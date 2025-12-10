import React, { useState } from "react";
import SignUpPage from "./SignUpPage";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        alert("Invalid credentials or account does not exist.");
        return;
      }

      // ✅ Save login status
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      alert("Login successful!");
      navigate("/"); // redirect to Home

    } catch (error) {
      console.error(error);
      alert("Server error. Make sure JSON server is running.");
    }
  };

  // Show SignUp Page
  if (showSignUp) {
    return <SignUpPage onBackToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?
          <span className="auth-link" onClick={() => setShowSignUp(true)}>
            {" "}Create now
          </span>
        </p>

      </div>
    </div>
  );
}
