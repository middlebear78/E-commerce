import axios from "axios";

import store from "../store"; // Adjust the path to your store file

export const getAuthToken = () => {
  const state = store.getState();
  if (state && state.user && state.user.token) {
    return state.user.token;
  }
  // Optionally, you can handle the case where the token is missing
  console.error("Token is missing");
  return null;
};

// Create an Axios instance

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    // console.log(token); 
    if (token) {
      config.headers.authtoken = `${token}`; // Use Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      // Redirect to login or show a notification
      // e.g., window.location.href = '/login';
      // or notify.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default api;
