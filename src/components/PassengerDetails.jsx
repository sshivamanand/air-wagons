import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Passenger() {
  const location = useLocation();
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    flightLogo,
    airlineName,
    flightCost,
    numPassengers,
  } = location.state || {};

  const navigate = useNavigate();

  // State for passengers' data
  const [passengers, setPassengers] = useState(
    Array.from({ length: numPassengers }, () => ({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    }))
  );

  const [activePassenger, setActivePassenger] = useState(0); // State for the currently displayed passenger

  const [user, setUser] = useState(null);

  const handleInputChange = (e, index, field) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = e.target.value;
    setPassengers(updatedPassengers);
  };

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        passengers,
        origin,
        destination,
        departureDate,
        returnDate,
        flightLogo,
        airlineName,
      },
    });
  };

  const handleCancel = () => {
    alert("Cancelled");
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToUserInfo = () => {
    navigate("/user-info");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        if (userData && userData.name && userData.email) {
          setUser(userData);
        } else {
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
        {user ? (
          <p onClick={goToUserInfo} style={{ cursor: "pointer" }}>
            Welcome, {user.name}
          </p>
        ) : (
          <p onClick={goToLogin}>Login/Register</p>
        )}
      </div>

      <div
        className="details"
        style={{
          height: "40rem",
          marginTop: "-3rem",
          paddingTop: "2rem",
        }}>
        <div className="details-in1">
          {/* Buttons for Passenger Details */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1vw",
              backgroundColor: "#f0f0f0",
              padding: "1vw",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
            {Array.from({ length: numPassengers }, (_, index) => (
              <button
                key={`passenger${index + 1}`}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor:
                    activePassenger === index ? "#2196F3" : "#f0f0f0",
                  color: activePassenger === index ? "white" : "black",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setActivePassenger(index)} // Update activePassenger on button click
              >
                Passenger {index + 1}
              </button>
            ))}
          </div>

          {/* Passenger Details Form */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}>
              <div
                style={{
                  marginLeft: "1.5rem",
                  width: "47.7rem",
                  height: "31rem",
                  overflow: "hidden",
                  scrollBehavior: "smooth",
                }}>
                <div
                  id={`passenger${activePassenger + 1}`}
                  className="passengerDetails">
                  <h3>Passenger {activePassenger + 1} Details</h3>
                  <div style={{ marginBottom: "1rem" }}>
                    <input
                      maxLength="20"
                      value={passengers[activePassenger].firstName}
                      placeholder="First and Middle Name"
                      onChange={(e) =>
                        handleInputChange(e, activePassenger, "firstName")
                      }
                      style={{
                        marginLeft: "1rem",
                        fontSize: "1rem",
                        height: "2rem",
                        border: "1px solid #aaa",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        flexGrow: 1,
                      }}
                    />

                    <input
                      maxLength="20"
                      value={passengers[activePassenger].lastName}
                      placeholder="Last Name"
                      onChange={(e) =>
                        handleInputChange(e, activePassenger, "lastName")
                      }
                      style={{
                        marginLeft: "1rem",
                        fontSize: "1rem",
                        height: "2rem",
                        border: "1px solid #aaa",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        flexGrow: 1,
                      }}
                    />
                  </div>

                  <div
                    className="Contact-Info-Details"
                    maxLength="10"
                    style={{ marginBottom: "2rem" }}>
                    <label
                      htmlFor={`phone${activePassenger + 1}`}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}>
                      Phone Number
                    </label>
                    <input
                      id={`phone${activePassenger + 1}`}
                      type="tel"
                      maxLength={10}
                      value={passengers[activePassenger].phone}
                      placeholder="Enter your phone number"
                      onChange={(e) =>
                        handleInputChange(e, activePassenger, "phone")
                      }
                      style={{
                        width: "97.5%",
                        height: "2rem",
                        fontSize: "1rem",
                        padding: "0.5rem",
                        border: "1px solid #aaa",
                        borderRadius: "4px",
                        marginBottom: "1rem",
                      }}
                    />

                    <label
                      type="email"
                      htmlFor={`email${activePassenger + 1}`}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}>
                      Email
                    </label>
                    <input
                      id={`email${activePassenger + 1}`}
                      type="email"
                      value={passengers[activePassenger].email}
                      placeholder="Enter your email"
                      onChange={(e) =>
                        handleInputChange(e, activePassenger, "email")
                      }
                      style={{
                        width: "97.5%",
                        height: "2rem",
                        fontSize: "1rem",
                        padding: "0.5rem",
                        border: "1px solid #aaa",
                        borderRadius: "4px",
                        marginBottom: "2rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-in2">
          <h2 style={{ textAlign: "center" }}>Flight Summary</h2>
          <img
            src={flightLogo}
            alt="Flight Logo"
            style={{ height: "100px", marginLeft: "7rem" }}
          />
          <p style={{ marginLeft: "1rem" }}>
            AirLine <span style={{ fontWeight: "600" }}>{airlineName}</span>
          </p>
          <p style={{ marginLeft: "1rem" }}>
            From <span style={{ fontWeight: "600" }}>{origin}</span>
          </p>
          <p style={{ marginLeft: "1rem" }}>
            To <span style={{ fontWeight: "600" }}>{destination}</span>
          </p>
          <p style={{ marginLeft: "1rem" }}>
            Departure Date{" "}
            <span style={{ fontWeight: "600" }}>{departureDate}</span>
          </p>
          <p style={{ marginLeft: "1rem" }}>
            Return Date <span style={{ fontWeight: "600" }}>{returnDate}</span>
          </p>
          <p style={{ marginLeft: "1rem" }}>
            Cost Rs. <span style={{ fontWeight: "600" }}>{flightCost}</span>
          </p>
          <button
            style={{
              backgroundColor: "green",
              marginTop: "1rem",
              marginLeft: "9rem",
            }}
            onClick={handleProceed}>
            Proceed
          </button>
          <br />
          <button
            style={{
              backgroundColor: "red",
              marginTop: "0.5rem",
              marginLeft: "9rem",
            }}
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Passenger;
