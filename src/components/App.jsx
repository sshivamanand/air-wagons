import React, { useState, useEffect } from "react";
import LandingPage from "./Landing";
import Passenger from "./PassengerDetails";
import Payment from "./PaymentsDetails";
import Login from "./Login";
import SignUp from "./SignUp";
import BookingConfirmation from "./BookingConfirmation";
import UserInfo from "./UserInfo";
import FlightOptions from "./FlightOptions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  // Retrieve user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/flight-options" element={<FlightOptions />} />
        <Route
          path="/passenger-details"
          element={<Passenger numsPassenger={1} />}
        />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/user-info"
          element={
            user ? (
              <UserInfo
                userf={user.name}
                usere={user.email}
                userp={user.password}
              />
            ) : (
              <p>Loading user info...</p>
            )
          }
        />
        <Route path="/confirmation" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
