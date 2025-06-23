// Create a new file for axios configuration
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Match your backend port
});

export default instance;
