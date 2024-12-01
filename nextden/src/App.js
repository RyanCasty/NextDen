import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/header/header";
import FinanceCoach from "./components/pages/Chatbot/chatbot";
import Dashboard from "./components/pages/Dashboard/dashboard";
import Tinder from "./components/pages/Tinder/tinder";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/financeCoach" element={<FinanceCoach />} />
          <Route path="/tinder" element={<Tinder />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
