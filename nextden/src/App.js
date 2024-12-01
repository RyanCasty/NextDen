import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/common/header/header";
import FinanceCoach from "./components/pages/Chatbot/chatbot";
import Dashboard from "./components/pages/Dashboard/dashboard";
import Tinder from "./components/pages/Tinder/tinder";
import "./App.css";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financeCoach" element={<FinanceCoach />} />
              <Route path="/tinder" element={<Tinder />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="/" element={<div>Welcome! Please log in.</div>} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
