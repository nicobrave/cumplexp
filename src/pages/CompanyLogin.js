import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/companies/login", formData);
      console.log(response.data);

      if (response.data.token) {
        // Guardar el token y el ID de la empresa en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("companyId", response.data.company._id); // Guardar el ID de la empresa

        // Redirigir al dashboard de la empresa
        navigate("/company/dashboard", { replace: true });
      } else {
        console.error("No token received");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Invalid email or password");
      } else {
        console.error("Error logging in:", error);
      }
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
