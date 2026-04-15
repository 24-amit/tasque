// src/components/LoadingButton/LoadingButton.jsx
import React from "react";
import "./LoadingButton.css";

function LoadingButton({ loading, children, ...props }) {
  return (
    <button type="submit" className="submit-btn" disabled={loading} {...props}>
      {loading ? <span className="loader"></span> : children}
    </button>
  );
}

export default LoadingButton;