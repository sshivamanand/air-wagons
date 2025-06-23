import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

const Payment = () => {
  const location = useLocation();
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    flightLogo,
    airlineName,
  } = location.state || {};
  const [activeTab, setActiveTab] = useState("card");
  const [user, setUser] = useState(null); // Declare state for user
  const cardSectionRef = useRef(null);
  const upiSectionRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);

        if (userData && userData.name && userData.email) {
          setUser(userData); // Set the user state
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

  // Navigate to user info page (if needed)
  const goToUserInfo = () => {
    navigate("/user-info");
  };

  // Navigate to login page (if needed)
  const goToLogin = () => {
    navigate("/login");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "card") {
      cardSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "upi") {
      upiSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProceed = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all required fields are filled
    const cardNumber = document.querySelector(
      "input[placeholder='Card Number']"
    );
    const validThru = document.querySelector("input[placeholder='MM/YY']");
    const cvv = document.querySelector("input[placeholder='CVV']");
    const cardHolder = document.querySelector(
      "input[placeholder='Card Holder Name']"
    );
    const upiId = document.querySelector("input[placeholder='example@upi']");

    if (activeTab === "card") {
      if (
        !cardNumber.value ||
        !validThru.value ||
        !cvv.value ||
        !cardHolder.value
      ) {
        alert("Please fill all required fields for the Card section.");
        return;
      }
    } else if (activeTab === "upi") {
      if (!upiId.value) {
        alert("Please enter your UPI ID.");
        return;
      }
    }
    // If all required fields are filled, navigate to the confirmation page
    navigate("/confirmation", {
      state: {
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
    navigate("/"); // Navigate away if needed
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    flex: "1",
    maxWidth: "200px",
  };

  const proceedButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#5699E0", // Blue color for Proceed button
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // Red color for Cancel button
    color: "white",
  };

  return (
    <>
      <div className="landing-page">
        {/* Header Section */}
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: "0",
            zIndex: "1000",
          }}>
          <img src="/images/logo.png" alt="logo" style={{ height: "40px" }} />
          {/* Show login/register if not logged in, otherwise display name */}
          {user ? (
            <p onClick={goToUserInfo} style={{ cursor: "pointer" }}>
              Welcome, {user.name}
            </p>
          ) : (
            <p onClick={goToLogin}>Login/Register</p>
          )}
        </div>

        {/* Payment Details */}
        <div
          className="details"
          style={{
            padding: "1vw",
            minHeight: "calc(100vh - 10vw)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <div
            className="transaction-container"
            style={{ width: "80%", maxWidth: "600px", textAlign: "center" }}>
            {/* Tab Buttons */}
            <div
              className="tab-buttons"
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "1rem",
              }}>
              <button
                className={`tab-button ${activeTab === "card" ? "active" : ""}`}
                onClick={() => handleTabChange("card")}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: activeTab === "card" ? "#5699E0" : "#f5f5f5",
                  color: activeTab === "card" ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}>
                Card
              </button>
              <button
                className={`tab-button ${activeTab === "upi" ? "active" : ""}`}
                onClick={() => handleTabChange("upi")}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: activeTab === "upi" ? "#5699E0" : "#f5f5f5",
                  color: activeTab === "upi" ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}>
                UPI
              </button>
            </div>

            {/* Sections */}
            <div
              className="sections-container"
              style={{ minHeight: "200px", transition: "all 0.3s ease" }}>
              <div
                ref={cardSectionRef}
                className={`card-section ${
                  activeTab === "card" ? "visible" : "hidden"
                }`}
                style={{ display: activeTab === "card" ? "block" : "none" }}>
                <h3>Card</h3>
                <div>
                  <label>Card Number</label>
                  <input type="tel" placeholder="Card Number" required />
                </div>
                <div>
                  <label>Valid Thru</label>
                  <input type="text" placeholder="MM/YY" required />
                  <label>CVV</label>
                  <input maxLength={4} type="text" placeholder="CVV" required />
                </div>
                <div>
                  <label>Name of Card Holder</label>
                  <input type="text" placeholder="Card Holder Name" required />
                </div>
              </div>

              <div
                ref={upiSectionRef}
                className={`upi-section ${
                  activeTab === "upi" ? "visible" : "hidden"
                }`}
                style={{ display: activeTab === "upi" ? "block" : "none" }}>
                <h3>UPI</h3>
                <div>
                  <label>Enter UPI ID</label>
                  <input type="text" placeholder="example@upi" required />
                </div>
              </div>
            </div>
          </div>

          {/* Proceed and Cancel Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "1rem",
              width: "100%",
              maxWidth: "600px",
            }}>
            <button style={proceedButtonStyle} onClick={handleProceed}>
              Proceed to Pay
            </button>
            <button style={cancelButtonStyle} onClick={handleCancel}>
              Cancel Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
