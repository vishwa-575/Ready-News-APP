import React, { useState } from "react";
import "./auth.css";

export default function SignUpPage({ onBackToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      fullName,
      email,
      password
    };

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const alreadyExists = users.find((u) => u.email === email);

      if (alreadyExists) {
        alert("Account already exists! Try logging in.");
        return;
      }

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      alert("Account created successfully!");
      onBackToLogin();
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Create Account</h2>

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?
          <span className="auth-link" onClick={onBackToLogin}> Login</span>
        </p>
      </div>
    </div>
  );
}
