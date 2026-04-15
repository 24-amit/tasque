// src/components/Alert/Alert.jsx
import React from "react";
import "./Alert.css";

function Alert({ message, type = "info" }) {
  if (!message) return null;

  return (
    <div className={`alert-box ${type}-alert`}>
      {message}
    </div>
  );
}

export default Alert;