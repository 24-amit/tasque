// src/hooks/useForm.js
import { useState } from "react";

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, handleChange, resetForm, setFormData };
}

export default useForm;