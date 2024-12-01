import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home, Bed, Zap, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import "./header.css";


function Header() {
  const navigate = useNavigate(); // Add this import and hook
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

  // When selections change, update the URL
  useEffect(() => {
    const queryParams = new URLSearchParams();
    
    if (selections.bedrooms) queryParams.set('bedrooms', selections.bedrooms);
    if (selections.location) queryParams.set('location', selections.location);
    if (selections.housingType) queryParams.set('housingType', selections.housingType);
    if (selections.utilities.length) queryParams.set('utilities', selections.utilities.join(','));
    
    navigate({
      pathname: location.pathname,
      search: queryParams.toString()
    }, { replace: true });
  }, [selections, navigate, location.pathname]);

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
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.preferences-dropdown')) {
        setIsMainDropdownOpen(false);
        setExpandedSection(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
            <h4>Den Finder</h4>
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
                {/* Housing Type Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={(e) => toggleSection('housingType', e)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <Home size={13} />
                  <span>{selections.housingType || '  Housing Type'}</span>
                </div>
                {expandedSection === 'housingType' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expandedSection === 'housingType' && (
                <div className="bg-gray-50 py-1">
                  {housingTypes.map((type) => (
                    <button
                      key={type}
                      onClick={(e) => handleSelection('housingType', type, e)}
                      className="w-full px-8 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Bedrooms Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={(e) => toggleSection('bedrooms', e)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <Bed size={16} />
                  <span>{selections.bedrooms || '  Bedrooms'}</span>
                </div>
                {expandedSection === 'bedrooms' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expandedSection === 'bedrooms' && (
                <div className="bg-gray-50 py-1">
                  {bedroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={(e) => handleSelection('bedrooms', option, e)}
                      className="w-full px-8 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Utilities Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={(e) => toggleSection('utilities', e)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <Zap size={16} />
                  <span>{selections.utilities.length ? `${selections.utilities.length} selected` : '  Utilities'}</span>
                </div>
                {expandedSection === 'utilities' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expandedSection === 'utilities' && (
                <div className="bg-gray-50 py-1">
                  {utilityOptions.map((utility) => (
                    <button
                      key={utility}
                      onClick={(e) => handleSelection('utilities', utility, e)}
                      className="w-full px-8 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                    >
                      <input
                        type="checkbox"
                        checked={selections.utilities.includes(utility)}
                        onChange={() => {}}
                        className="mr-2"
                      />
                      {utility}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Location Section */}
            <div>
              <button
                onClick={(e) => toggleSection('location', e)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  <span>{selections.location || ' Location'}</span>
                </div>
                {expandedSection === 'location' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expandedSection === 'location' && (
                <div className="bg-gray-50 py-1">
                  {locationOptions.map((location) => (
                    <button
                      key={location}
                      onClick={(e) => handleSelection('location', location, e)}
                      className="w-full px-8 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
