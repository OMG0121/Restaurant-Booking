import React, { useState, useEffect, useRef } from "react";

import { TbGrill } from "react-icons/tb";
import { PiForkKnife } from "react-icons/pi";


import "./Navbar.css";
function useOutsideAlerter(ref, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const popupRef = useRef();
  useOutsideAlerter(popupRef, () => setShowPopup(false));


  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Clicked element: ", event.target);
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        console.log("Click outside popup detected");
        setShowPopup(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowPopup(false);
    }, 3000);
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
      <h2 className="p__cormorant"><a href="#home">OMG'sKictchen</a></h2>
      </div>

      <ul className="app__navbar-links">
        <li className="p__opensans">
          <a href="#home">Home</a>
        </li>
        <li className="p__opensans">
          <a href="#about">About</a>
        </li>
        <li className="p__opensans">
          <a href="#menu">Menu</a>
        </li>
        <li className="p__opensans">
          <a href="#awards">Awards</a>
        </li>
        <li className="p__opensans">
          <a href="#contact">Contact</a>
        </li>
      </ul>

      
        <div className="app__navbar-login">
        <button className="p__opensans" onClick={() => setShowPopup(true)}>
          Book Table
        </button>
      </div>

      <div className="app__navbar-smallscreens">
        <TbGrill
          color="#DCCA87"
          fontSize={27}
          onClick={() => {
            setToggle(true);
          }}
        />

        {toggle && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <PiForkKnife
              fontSize={27}
              className="overlay__close"
              onClick={() => {
                setToggle(false);
              }}
            />

            <ul className="app__navbar-smallscreens-links">
              <li className="p__opensans">
                <a href="#home" onClick={() => {
                setToggle(false);
              }}>Home</a>
              </li>
              <li className="p__opensans">
                <a href="#about" onClick={() => {
                setToggle(false);
              }}>About</a>
              </li>
              <li className="p__opensans">
                <a href="#menu" onClick={() => {
                setToggle(false);
              }}>Menu</a>
              </li>
              <li className="p__opensans">
                <a href="#awards" onClick={() => {
                setToggle(false);
              }}>Awards</a>
              </li>
              <li className="p__opensans">
                <a href="#contact" onClick={() => {
                setToggle(false);
              }}>Contact</a>
              </li>
              
            </ul>
            
          </div>
          
        )}
      </div>
      {showPopup && (
  <div className="popup-container" ref={popupRef}>
    <div className="popup">
      <button
        className="close-button"
        onClick={() => setShowPopup(false)}
      >
        ×
      </button>
      <h2 className="popup-title">Reserve Your Table</h2>
      <form onSubmit={handleFormSubmit} className="booking-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="tel" placeholder="Phone Number" />
        <input type="number" placeholder="Number of Guests" required />
        <input type="date" required />
        <input type="time" required />
        
        <button type="submit" className="submit-button">Book Now</button>
      </form>
    </div>
  </div>
)}

{showSuccessMessage && (
        <div className="success-message">Your Booking Done Successfully</div>
      )}

    </nav>
  );
};

export default Navbar;
