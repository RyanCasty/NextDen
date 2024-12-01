import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home, Bed, Zap, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import "./header.css";

function Header() {
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const location = useLocation();

  const [expandedSection, setExpandedSection] = useState(null);
  const [selections, setSelections] = useState({
    budget: 2000,
    housingType: '',
    bedrooms: '',
    utilities: [],
    location: ''
  });

   const housingTypes = ['  Apartment', '  House', '  Sublets'];
  const bedroomOptions = ['  Studio', '  1', '  2', '  3', '  4+'];
  const utilityOptions = ['  A/C', '  Private Bedroom', '  Laundry', '  Parking', '  Internet Incl'];
  const locationOptions = ['  Downtown', '  Old North', '  Near South', 'Near West', '  Masonville', '  North London'];

  const toggleMainDropdown = (e) => {
    e.stopPropagation();
    setIsMainDropdownOpen(!isMainDropdownOpen);
    setExpandedSection(null);
  };

  const toggleSection = (section, e) => {
    e.stopPropagation();
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSelection = (category, value, e) => {
    e.stopPropagation();
    if (category === 'utilities') {
      setSelections(prev => ({
        ...prev,
        utilities: prev.utilities.includes(value)
          ? prev.utilities.filter(item => item !== value)
          : [...prev.utilities, value]
      }));
    } else {
      setSelections(prev => ({ ...prev, [category]: value }));
      setExpandedSection(null);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo"></Link>
        <nav className="nav-tabs">
          <Link
            to="/dashboard"
            className={`nav-tab ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <h4>Dashboard</h4>
          </Link>
          <Link
            to="/financeCoach"
            className={`nav-tab ${location.pathname === '/financeCoach' ? 'active' : ''}`}
          >
            <h4>Cubby Coach</h4>
            </Link>
          <Link
            to="/tinder"
            className={`nav-tab ${location.pathname === '/tinder' ? 'active' : ''}`}
          >
            <h4>DenFinder</h4>
          </Link>
        </nav>
        <div className="bear-container">
        <div className="walking-bear" />
      </div>
      </div>
      <div className="preferences-dropdown relative">
        <div className="profile-icon" onClick={toggleMainDropdown}>
          {isAuthenticated && user?.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="circle profile-picture"
            />
          ) : (
            <div className="circle gray-circle"></div>
          )}
        </div>
        {isMainDropdownOpen && (
          <div className="dropdown-menu">
            {isAuthenticated ? (
              <>
                <div className="user-info px-4 py-2">
                  <p>Welcome, {user?.name || "User"}</p>
                </div>
                {/* Housing Type Section */}
                {/* [Other dropdown sections remain unchanged] */}
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => loginWithRedirect()}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
