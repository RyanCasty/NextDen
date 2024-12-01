import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bed, Zap, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import './header.css';

function Header() {
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();
  const [selections, setSelections] = useState({
    budget:2000,
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
        <Link to="/" className="logo">sk.</Link>
        <nav className="nav-tabs">
          <Link 
            to="/dashboard" 
            className={`nav-tab ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/financeCoach" 
            className={`nav-tab ${location.pathname === '/financeCoach' ? 'active' : ''}`}
          >
            Cubby Coach
          </Link>
          <Link 
            to="/tinder" 
            className={`nav-tab ${location.pathname === '/tinder' ? 'active' : ''}`}
          >
            House Match
          </Link>
        </nav>
      </div>
      <div className="preferences-dropdown relative">
        <div className="profile-icon" onClick={toggleMainDropdown}>
          <div className="circle"></div>
        </div>
        {isMainDropdownOpen && (
          <div className="dropdown-menu">
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;