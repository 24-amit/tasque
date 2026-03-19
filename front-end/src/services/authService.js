// src/services/authService.js
import axios from "axios";
import { API_BASE_URL } from "../constants/apiEndpoints";

const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/user/register`,
        userData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed. Please check your details."
      };
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,  // Update this to match your backend endpoint
        credentials
      );
      
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Invalid email or password."
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

export default authService;