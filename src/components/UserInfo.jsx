import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Update the path according to your project structure

const UserInfo = (props) => {
  const location = useLocation();

  const [inputvaluef, setInputValuef] = useState(props.userf || "");
  const [inputvaluem, setInputValuem] = useState(props.userm || "");
  const [inputvaluel, setInputValuel] = useState(props.userl || "");
  const [inputvaluep, setInputValuep] = useState(props.userp || "");
  const [inputvaluee, setInputValuee] = useState(props.usere || "");
  const [inputvalueCurrentPass, setInputValueCurrentPass] = useState("");
  const [inputvalueNewPass, setInputValueNewPass] = useState("");
  const [inputvalueusername, setInputValueusername] = useState(
    props.user || ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setInputValuef(props.userf || "");
    setInputValuem(props.userm || "");
    setInputValuel(props.userl || "");
    setInputValuep(props.userp || "");
    setInputValuee(props.usere || "");
    setInputValueusername(props.user || "");
  }, [props]);

  useEffect(() => {
    if (inputvaluee) {
      fetchUserProfile();
    }
  }, [inputvaluee]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // In your frontend UserInfo.jsx, modify the handleUpdateProfile function:
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/updateProfile",
        {
          email: inputvaluee,
          password: inputvalueCurrentPass,
          newPassword: inputvalueNewPass,
          name: inputvalueusername,
        }
      );
      setSuccess("Profile updated successfully!");
      fetchUserProfile();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete("http://localhost:5000/api/deleteAccount", {
          data: { email: inputvaluee },
        });
        setSuccess("Account deleted successfully");
        handleLogout();
      } catch (error) {
        setError(error.response?.data?.error || "Failed to delete account");
      }
    }
  };
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getUserProfile",
        {
          params: { email: inputvaluee },
        }
      );
      const user = response.data;
      setInputValuef(user.name);
      setInputValuem(user.email);
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      setError("Error fetching user profile. Please try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "15px",
          color: "white",
        }}>
        <img src="/images/logo.png" alt="logo" style={{ height: "40px" }} />
        <p>Login/Register</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "White",
          maxWidth: "800px",
          margin: "20px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}>
          Profile & Account Settings
        </h2>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              fontWeight: "bold",
            }}>
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              color: "green",
              marginBottom: "10px",
              fontWeight: "bold",
            }}>
            {success}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={inputvalueusername}
              onChange={(e) => setInputValueusername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              value={inputvaluee}
              onChange={(e) => setInputValuee(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Current Password"
              value={inputvalueCurrentPass}
              onChange={(e) => setInputValueCurrentPass(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={inputvalueNewPass}
              onChange={(e) => setInputValueNewPass(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              gap: "10px",
            }}>
            <button
              type="button"
              style={{
                padding: "10px 20px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleLogout}>
              Logout
            </button>
            <button
              type="button"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleUpdateProfile}>
              Update Profile
            </button>
            <button
              type="button"
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
