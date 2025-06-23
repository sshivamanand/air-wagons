import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const FlightOptions = () => {
  const location = useLocation(); // Access the passed state from LandingPage
  const {
    flightOrigin,
    flightDestination,
    flightDate,
    flightReturnDate,
    numPassengers,
  } = location.state || {};

  // Initialize the state with values passed via location.state
  const [origin] = useState(flightOrigin || "");
  const [destination] = useState(flightDestination || "");
  const [departureDate] = useState(flightDate || "");
  const [returnDate] = useState(flightReturnDate || "");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // State to hold user information
  const navigate = useNavigate(); // Hook for navigation

  const fetchFlights = async () => {
    setError(""); // Clear previous error
    try {
      const params = { origin, destination, departureDate };
      if (returnDate) params.returnDate = returnDate;

      // Fetch both `best_flights` and `other_flights` in parallel
      const response = await axios.get("http://localhost:5000/api/flights", {
        params,
      });

      const bestFlights = response.data.best_flights.map((flight) => ({
        departureTime: flight.flights[0].departure_airport.time,
        arrivalTime: flight.flights[0].arrival_airport.time,
        price: flight.price,
        airlineLogo: flight.airline_logo,
        airlineName: flight.flights[0].airline,
        flightCost: flight.price,
        duration: flight.total_duration,
      }));

      const otherFlights = response.data.other_flights.map((flight) => ({
        departureTime: flight.flights[0].departure_airport.time,
        arrivalTime: flight.flights[0].arrival_airport.time,
        price: flight.price,
        airlineLogo: flight.airline_logo,
        airlineName: flight.flights[0].airline,
        flightCost: flight.price,
        duration: flight.total_duration,
      }));

      // Merge both flight lists
      const allFlights = [...bestFlights, ...otherFlights];

      setFlights(allFlights);
    } catch (error) {
      setError("Error fetching flight data");
      console.error("Error fetching flight data:", error);
    }
  };

  const handleBookNow = (flight) => {
    // Pass flight and other details as state to PassengerDetails page
    navigate("/passenger-details", {
      state: {
        origin,
        destination,
        departureDate,
        returnDate,
        flightLogo: flight.airlineLogo, // The selected flight logo
        airlineName: flight.airlineName, // Correctly passed airline name
        flightCost: flight.flightCost,
        numPassengers,
        // Correctly passed flight cost
      },
    });
  };

  useEffect(() => {
    // Fetch flights when the component mounts
    fetchFlights();

    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        if (userData && userData.name) {
          setUser(userData); // Set the user state
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [origin, destination, departureDate, returnDate]);

  return (
    <div className="landing-page">
      <div className="header">
        <img src="/images/logo.png" alt="logo" />
        {/* Display username if logged in */}
        {user ? <p>Hello, {user.name}</p> : <p>Hello, Guest</p>}
      </div>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Flight Details</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}>
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            readOnly
            style={{ padding: "10px", width: "150px" }}
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            readOnly
            style={{ padding: "10px", width: "150px" }}
          />
          <input
            type="date"
            value={departureDate}
            readOnly
            style={{ padding: "10px", width: "150px" }}
          />
          <input
            type="date"
            placeholder="Return Date"
            value={returnDate}
            readOnly
            style={{ padding: "10px", width: "150px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            maxHeight: "65vh",
            overflowY: "auto",
          }}>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div
                key={index}
                style={{
                  marginTop: "10px",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  padding: "20px",
                  width: "250px",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}>
                <img
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80px",
                    marginBottom: "10px",
                  }}
                  src={flight.airlineLogo}
                  alt={`${flight.airlineName} logo`}
                />
                <h3>{flight.airlineName}</h3>
                <p>Price: ₹{flight.flightCost}</p>
                <p>Duration: {flight.duration} minutes</p>
                <p>
                  Departure: {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
                <button
                  onClick={() => handleBookNow(flight)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}>
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>No flights found. Please modify your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightOptions;
