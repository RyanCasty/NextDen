import React, { useState } from "react";
import '../styles/tinder.css'; 

const houses = [
    {
      id: 1,
      address: "14 Elyssa Drive",
      price: "$800 / bdrm",
      bedrooms: 3,
      bathrooms: 2.5,
      utilities: "Extra",
      location: "Old North",
      distance: "2.4 km",
      dateAvailable: "January 1, 2025",
      leaseTerm: "12 months",
      images: [
        "https://via.placeholder.com/150", // Replace with real images
        "https://via.placeholder.com/150",
      ],
    },
    {
      id: 2,
      address: "759 Whetherfield St",
      price: "$2100 / bdrm",
      bedrooms: 4,
      bathrooms: 3,
      utilities: "Included",
      location: "Old South",
      distance: "9.8 km",
      dateAvailable: "January 1, 2025",
      leaseTerm: "12 months",
      images: [
        "https://via.placeholder.com/150", // Replace with real images
      ],
    },
  ];
  
  function Tinder() {
    const [currentHouseIndex, setCurrentHouseIndex] = useState(0);
    const [savedListings, setSavedListings] = useState([]);
  
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
  
    return (
      <div className="app">
        <header className="header">
          <h1>start swiping :)</h1>
        </header>
        <main>
          <div className="house-card">
            <img src={houses[currentHouseIndex].images[0]} alt="House" />
            <div className="house-info">
              <h2>{houses[currentHouseIndex].address}</h2>
              <p>{houses[currentHouseIndex].price}</p>
              <p>{houses[currentHouseIndex].bedrooms} bedrooms</p>
              <p>{houses[currentHouseIndex].bathrooms} bathrooms</p>
              <p>Location: {houses[currentHouseIndex].location}</p>
            </div>
            <div className="actions">
              <button onClick={handleSkip} className="skip">
                ❌ 
              </button>
              <button onClick={handleSave} className="save">
                ✅ 
              </button>
            </div>
          </div>
          <section className="saved-listings">
            <h2>Your saved listings</h2>
            <div className="listings">
              {savedListings.map((house) => (
                <div key={house.id} className="listing-card">
                  <img src={house.images[0]} alt="House" />
                  <h3>{house.address}</h3>
                  <p>{house.price}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

export default Tinder;