// Importing the axios library for making HTTP requests
import axios from "axios";

// Defining the base URL for the API
const BASE_URL = "http://YOUR_BACKEND_IP:3000";

// Creating and exporting a default axios instance with the base URL
export default axios.create({
  baseURL: BASE_URL, // Setting the base URL for the axios instance
});

// Creating and exporting a separate axios instance for private requests
export const axiosPrivate = axios.create({
  baseURL: BASE_URL, // Setting the base URL for the private axios instance
  headers: { "Content-Type": "application/json" }, // Setting default headers for the private instance
  withCredentials: true, // Ensuring that cookies are sent with requests
});
