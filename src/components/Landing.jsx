import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

function LandingPage() {
  const location = useLocation();

  // State variables for storing input values
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [user, setUser] = useState(null); // To store user info

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle search action
  const handleSearch = () => {
    if (!user) {
      alert("You must be logged in to search for flights.");
      navigate("/login");
      return;
    }

    if (!origin || !destination || !departureDate) {
      alert(
        "Please fill in all required fields: Origin, Destination, and Departure Date!"
      );
      return;
    }

    console.log("Flight Search Details:", {
      Origin: origin,
      Destination: destination,
      DepartureDate: departureDate,
      ReturnDate: returnDate || "Not specified",
      Passengers: passengers,
    });

    navigate("/flight-options", {
      state: {
        flightOrigin: origin,
        flightDestination: destination,
        flightDate: departureDate,
        flightReturnDate: returnDate || null,
        numPassengers: passengers,
      },
    });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToUserInfo = () => {
    navigate("/user-info"); // Redirect to the UserInfo page
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);

        if (userData && userData.name && userData.email) {
          setUser(userData); // Assuming "name" and "email" from schema
        } else {
          console.warn("Invalid user data found in localStorage");
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="landing-page">
      <div className="header">
        <img src="/images/logo.png" alt="logo" />
        {/* Show login/register if not logged in, otherwise display name */}
        {user ? (
          <p onClick={goToUserInfo} style={{ cursor: "pointer" }}>
            Welcome, {user.name}
          </p>
        ) : (
          <p onClick={goToLogin}>Login/Register</p>
        )}
      </div>
      <div className="main">
        <div className="box">
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            placeholder="Enter origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="box">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="box">
          <label htmlFor="date">Departure Date</label>
          <input
            type="date"
            id="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <div className="box">
          <label htmlFor="returnDate">Return Date (optional)</label>
          <input
            type="date"
            id="returnDate"
            placeholder="Optional: Select return date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div className="box">
          <label htmlFor="passengers">Passengers</label>
          <select
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default LandingPage;
