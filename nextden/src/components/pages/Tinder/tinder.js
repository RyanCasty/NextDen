import React, { useState, useEffect } from "react";
import './tinder.css';

function Tinder() {
  const [houses, setHouses] = useState([]);
  const [currentHouseIndex, setCurrentHouseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savedListings, setSavedListings] = useState(() => {
    const saved = localStorage.getItem("savedListings");
    return saved ? JSON.parse(saved) : []; // Retrieve from localStorage or initialize as an empty array
  });
  const [bedroomFilter, setBedroomFilter] = useState(null); // New filter state

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/listings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Transform the data to match the expected structure
        const transformedData = data.map((house) => ({
          mainImage: house.Images[0],
          selectedImage: house.Images[0], // Add selectedImage property
          thumbnails: house.Images.slice(1),
          address: house.Details?.Location || "N/A",
          price: house.Price || "N/A",
          bedrooms: house.Details?.["Bedroom(s)"] || "N/A",
          bathrooms: house.Details?.Bathrooms || "N/A",
          housingType: house.Details?.["Housing Type"] || "N/A",
          utilities: house.Details?.Utilities || "N/A",
          location: house.Details?.Location || "N/A",
          dateAvailable: house.Details?.["Date Available"] || "N/A",
          leaseTerm: house.Details?.["Lease Term"] || "N/A",
          distance: house.Details?.Distance || "N/A",
        }));

        setHouses(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  useEffect(() => {
    // Save the savedListings to localStorage whenever it changes
    localStorage.setItem("savedListings", JSON.stringify(savedListings));
  }, [savedListings]);

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

  const handleThumbnailClick = (image) => {
    // Update the selectedImage for the current house
    const updatedHouses = [...houses];
    updatedHouses[currentHouseIndex].selectedImage = image;
    setHouses(updatedHouses);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (houses.length === 0) {
    return <div className="no-houses">No houses available</div>;
  }

  const currentHouse = houses[currentHouseIndex] || {};

  

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
              <img src={currentHouse.selectedImage || currentHouse.mainImage} alt="House" />
              <div className="image-overlay">
                <div className="address">{currentHouse.address}</div>
                <div className="price">{currentHouse.price !== "N/A" ? `$${currentHouse.price}` : "Price not available"}</div>
              </div>
            </div>

            <div className="thumbnails-container">
              <div className="thumbnails">
                {currentHouse.thumbnails?.map((thumb, index) => (
                  <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(thumb)}>
                    <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="house-stats">
                <span>🏠 {currentHouse.bedrooms} bedrooms</span>
                <span>🚿 {currentHouse.bathrooms} bathrooms</span>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <div className="label">Housing Type</div>
                <div className="value">🏠 {currentHouse.housingType}</div>
              </div>
              <div className="detail-item">
                <div className="label">Utilities</div>
                <div className="value">{currentHouse.utilities}</div>
              </div>
              <div className="detail-item">
                <div className="label">Location</div>
                <div className="value">📍 {currentHouse.location}</div>
              </div>
              <div className="detail-item">
                <div className="label">Date Available</div>
                <div className="value">📅 {currentHouse.dateAvailable}</div>
              </div>
              <div className="detail-item">
                <div className="label">Lease Term</div>
                <div className="value">{currentHouse.leaseTerm}</div>
              </div>
              <div className="detail-item">
                <div className="label">Distance from UWO</div>
                <div className="value">👣 {currentHouse.distance}</div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="accept-button">✅</button>
        </div>

        <div className="saved-listings">
          <h2>Your saved listings</h2>
          <div className="listings-grid">
            {savedListings.map((listing, index) => (
              <div key={index} className="listing-card">
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
