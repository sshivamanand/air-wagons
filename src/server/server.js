const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// MongoDB connection URL
const mongoURI = "mongodb://127.0.0.1:27017/Database";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// User model
const User = require("./models/User");

// Middleware
app.use(cors());
app.use(express.json());

// Get User Profile Route
app.get("/api/getUserProfile", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
});

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error: ", error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Both email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error: ", error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
});

// Update Profile Route
app.put("/api/updateProfile", async (req, res) => {
  const { email, password, newPassword, name } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and current password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Delete Account Route
app.delete("/api/deleteAccount", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

// Example API route for flight data
const apiKey =
  "95b9aa9f42eb2363d26c3bdc9b6a0b1b4bc3af18eff1b54e5db109919dc41975";
app.get("/api/flights", async (req, res) => {
  const { origin, destination, departureDate, returnDate } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${origin}&arrival_id=${destination}&gl=us&hl=en&currency=INR&outbound_date=${departureDate}&return_date=${returnDate}&api_key=${apiKey}`;

    const response = await axios.get(url);
    const jsonEndpoint = response.data.search_metadata?.json_endpoint;

    if (!jsonEndpoint) {
      throw new Error("JSON endpoint not found in SerpApi response");
    }

    const flightData = await axios.get(jsonEndpoint);
    res.json(flightData.data);
  } catch (error) {
    console.error("Error fetching flight data:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch flight data. Please try again later." });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, "../dist")));

// Route for the Payment Confirmation Page
app.get("/confirmation", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
