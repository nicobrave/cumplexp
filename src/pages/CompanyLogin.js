import React, { useState } from "react";
import axios from "axios";

function CompanyLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/companies/login", formData);
      console.log(response.data);
      // Save token and redirect to dashboard
    } catch (error) {
      console.error("Error logging in:", error);
      // Show error message
    }
  };

  return (
    <div>
      <h2>Company Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CompanyLogin;
