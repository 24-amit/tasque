// src/pages/Register/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Calculate password strength
  useEffect(() => {
    const calculateStrength = (pwd) => {
      let strength = 0;
      if (pwd.length >= 8) strength += 25;
      if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 25;
      if (pwd.match(/\d/)) strength += 25;
      if (pwd.match(/[^a-zA-Z\d]/)) strength += 25;
      return strength;
    };
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  // Auto-dismiss alerts
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

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "#ef4444";
    if (passwordStrength <= 50) return "#f59e0b";
    if (passwordStrength <= 75) return "#eab308";
    return "#10b981";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="container">
        <div className="content-wrapper">
          {/* Left Side - Marketing Content */}
          <div className="marketing-section">
            <div className="marketing-content">
              <h1 className="hero-title">
                Start your journey with
                <span className="gradient-text"> TasQue</span>
              </h1>
              <p className="hero-subtitle">
                Join thousands of users who trust us to manage their tasks efficiently and securely.
              </p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h3>Secure & Private</h3>
                    <p>Your data is encrypted and protected</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h3>Easy to Use</h3>
                    <p>Intuitive interface for seamless experience</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h3>24/7 Support</h3>
                    <p>We're here to help whenever you need</p>
                  </div>
                </div>
              </div>

              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">10k+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50k+</div>
                  <div className="stat-label">Tasks Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="form-section">
            <div className="form-box">
              <div className="form-header">
                <h2>Create Account</h2>
                <p>Get started for free. No credit card required.</p>
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

              <form onSubmit={handleSubmit} className="register-form">
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

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar-container">
                        <div 
                          className="strength-bar"
                          style={{ 
                            width: `${passwordStrength}%`,
                            backgroundColor: getStrengthColor()
                          }}
                        ></div>
                      </div>
                      <span 
                        className="strength-text"
                        style={{ color: getStrengthColor() }}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>

                <LoadingButton loading={loading}>
                  Create Account
                </LoadingButton>

                
              </form>

              <p className="footer-text">
                Already have an account?{" "}
                <Link to="/login" className="login-link">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;