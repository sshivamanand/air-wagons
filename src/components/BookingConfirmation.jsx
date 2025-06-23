import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingConfirmation() {
  const location = useLocation();
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    flightLogo,
    airlineName,
  } = location.state || {};

  const navigate = useNavigate();

  // Handle return to home or another page
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}>
      {/* Booking Confirmation Card */}
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          textAlign: "center",
        }}>
        {/* Confirmation Message */}
        <h2
          style={{ color: "#28a745", fontSize: "2rem", marginBottom: "1rem" }}>
          Your Booking Has Been Confirmed!
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#555",
            marginBottom: "2rem",
          }}>
          Thank you for booking with us! Your flight details are confirmed and
          we are excited to welcome you aboard.
        </p>

        {/* Flight Details Section */}
        <div style={{ marginBottom: "2rem", textAlign: "left" }}>
          <img
            src={flightLogo}
            alt={`${airlineName} logo`}
            style={{
              width: "80px",
              marginBottom: "1rem",
              display: "block",
              margin: "0 auto",
            }}
          />
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}>
            {airlineName}
          </h3>
          <p style={{ fontSize: "1rem", color: "#555" }}>
            <strong>Airline Name:</strong> {airlineName} <br />
            <strong>From:</strong> {origin} <br />
            <strong>To:</strong> {destination} <br />
            <strong>Departure:</strong> {departureDate} <br />
            <strong>Return:</strong> {returnDate ? returnDate : "N/A"} <br />
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleReturnHome}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.1rem",
              cursor: "pointer",
              width: "100%",
            }}>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
