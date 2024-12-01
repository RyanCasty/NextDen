import React, { useState, useEffect } from "react";
import './tinder.css';

function Tinder() {
  const [houses, setHouses] = useState([]);
  const [currentHouseIndex, setCurrentHouseIndex] = useState(0);
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch houses from the backend
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/listings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched houses:", data); // Log the fetched data
        setHouses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };
  
    fetchHouses();
  }, []);
  

  const handleSave = () => {
    setSavedListings([...savedListings, houses[currentHouseIndex]]);
    nextHouse();
  };

  const handleSkip = () => {
    nextHouse();
  };

  const nextHouse = () => {
    setCurrentHouseIndex((prevIndex) =>
      prevIndex + 1 < houses.length ? prevIndex + 1 : 0
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (houses.length === 0) {
    return <div className="no-houses">No houses available</div>;
  }

  return (
    <div className="app">
      <div className="content">
        <div className="search-section">
          <h1>Swipe through the houses</h1>
          <button className="preferences-button">Edit my preferences</button>
          
          <div className="search-criteria">
            <span>Looking for:</span>
            <div className="criteria-item">
              <span>🏠</span> 3 bedrooms
            </div>
            <div className="criteria-item">
              <span>👣</span> 0 - 3km from UWO
            </div>
            <div className="criteria-item">
              <span>📍</span> Old North, Old South, Masonville, Downtown, Etc.
            </div>
          </div>
        </div>

        <div className="swipe-container">
          <button onClick={handleSkip} className="reject-button">❌</button>
          
          <div className="house-card">
            <div className="main-image-container">
              <img src={houses[currentHouseIndex].mainImage} alt="House" />
              <div className="image-overlay">
                <div className="address">{houses[currentHouseIndex].address}</div>
                <div className="price">{houses[currentHouseIndex].price}</div>
              </div>
            </div>

            <div className="thumbnails-container">
              <div className="thumbnails">
                {houses[currentHouseIndex].thumbnails.map((thumb, index) => (
                  <div key={index} className="thumbnail">
                    <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="house-stats">
                <span>🏠 {houses[currentHouseIndex].bedrooms} bedrooms</span>
                <span>🚿 {houses[currentHouseIndex].bathrooms} bathrooms</span>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <div className="label">Housing Type</div>
                <div className="value">🏠 {houses[currentHouseIndex].housingType}</div>
              </div>
              <div className="detail-item">
                <div className="label">Utilities</div>
                <div className="value">{houses[currentHouseIndex].utilities}</div>
              </div>
              <div className="detail-item">
                <div className="label">Location</div>
                <div className="value">📍 {houses[currentHouseIndex].location}</div>
              </div>
              <div className="detail-item">
                <div className="label">Date Available</div>
                <div className="value">📅 {houses[currentHouseIndex].dateAvailable}</div>
              </div>
              <div className="detail-item">
                <div className="label">Lease Term</div>
                <div className="value">{houses[currentHouseIndex].leaseTerm}</div>
              </div>
              <div className="detail-item">
                <div className="label">Distance from UWO</div>
                <div className="value">👣 {houses[currentHouseIndex].distance}</div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="accept-button">✅</button>
        </div>

        <div className="saved-listings">
          <h2>Your saved listings</h2>
          <div className="listings-grid">
            {savedListings.map((listing) => (
              <div key={listing._id} className="listing-card">
                <img src={listing.mainImage} alt={listing.address} />
                <div className="listing-info">
                  <div className="listing-price">{listing.price}</div>
                  <div className="listing-address">{listing.address}</div>
                  <div className="listing-location">
                    <span>📍 {listing.location}</span>
                    <span>👣 {listing.distance}</span>
                  </div>
                  <div className="listing-stats">
                    <span>🏠 {listing.bedrooms}</span>
                    <span>🚿 {listing.bathrooms}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tinder;
