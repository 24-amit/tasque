// src/pages/Login/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FormInput from "../../components/FormInput/FormInput";
import Alert from "../../components/Alert/Alert";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import authService from "../../services/authservice";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({ 
    email: "", 
    password: "" 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setLoginData({ 
      ...loginData, 
      [e.target.name]: e.target.value 
    });
  };

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await authService.login(loginData);

    if (result.success) {
      // Store remember me preference if needed
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      
      // Redirect to home or dashboard
      navigate("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="container">
        <div className="blob-bg login-blob"></div>
        <div className="form-box login-card">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          <Alert 
            message={error} 
            type="error" 
            onClose={() => setError("")}
          />

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <div className="input-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me for 30 days</label>
            </div>

            <LoadingButton loading={loading}>
              Sign In
            </LoadingButton>
          </form>

          <p className="footer-text">
            Don't have an account?{" "}
            <Link to="/register">Create one for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;