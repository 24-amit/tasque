// src/pages/Register/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Add Link import
import Navbar from "../../components/Navbar/Navbar";
import FormInput from "../../components/FormInput/FormInput";
import Alert from "../../components/Alert/Alert";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import useForm from "../../hooks/useForm";
import authService from "../../services/authservice";  
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const { formData, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await authService.register(formData);

    if (result.success) {
      setMessage("Welcome aboard! Registration successful.");
      resetForm();
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="container">
        <div className="blob-bg"></div>
        <div className="form-box">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Join thousands of users today.</p>
          </div>

          <Alert 
            message={message} 
            type="success" 
            onClose={() => setMessage("")}
          />
          <Alert 
            message={error} 
            type="error" 
            onClose={() => setError("")}
          />

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <LoadingButton loading={loading}>
              Get Started
            </LoadingButton>
          </form>

          <p className="footer-text">
            Already have an account? <Link to="/login">Log in</Link>  {/* ✅ Fixed */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;