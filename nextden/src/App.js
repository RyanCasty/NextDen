import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/common/header/header";
import FinanceCoach from "./components/pages/Chatbot/chatbot";
import Dashboard from "./components/pages/Dashboard/dashboard";
import Tinder from "./components/pages/Tinder/tinder";
import "./App.css";

function App() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/financeCoach"
            element={isAuthenticated ? <FinanceCoach /> : <Navigate to="/" />}
          />
          <Route
            path="/tinder"
            element={isAuthenticated ? <Tinder /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to Our App</h1>
                <button onClick={() => loginWithRedirect()}>Log In</button>
                <button
                  onClick={() =>
                    loginWithRedirect({ screen_hint: "signup" })
                  }
                >
                  Sign Up
                </button>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
