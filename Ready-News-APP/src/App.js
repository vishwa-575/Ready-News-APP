import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddNews from "./components/AddNews";
import NewsList from "./components/NewsList";
import LiveNews from "./components/LiveNews";
import Home from "./components/Home";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");

  // Theme switching
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live"
          element={
            <ProtectedRoute>
              <LiveNews />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
