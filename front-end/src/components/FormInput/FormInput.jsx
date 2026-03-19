// src/components/FormInput/FormInput.jsx
import React from "react";
import "./FormInput.css";

function FormInput({ label, name, type, placeholder, value, onChange, required = false }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default FormInput;