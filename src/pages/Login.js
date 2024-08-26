// client/src/pages/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Intentar iniciar sesión como cliente
      const resUser = await axios.post("/api/users/login", formData);
      if (resUser.data.token) {
        // Redirigir a la página del cliente
        localStorage.setItem("token", resUser.data.token);
        history.push("/user-dashboard");
        return;
      }
    } catch (err) {
      console.error(
        "Error al iniciar sesión como cliente:",
        err.response?.data,
      );
    }

    try {
      // Intentar iniciar sesión como empresa
      const resCompany = await axios.post("/api/companies/login", formData);
      if (resCompany.data.token) {
        // Redirigir a la página de la empresa
        localStorage.setItem("token", resCompany.data.token);
        history.push("/company-dashboard");
        return;
      }
    } catch (err) {
      console.error(
        "Error al iniciar sesión como empresa:",
        err.response?.data,
      );
    }

    alert("Credenciales incorrectas. Por favor, intenta nuevamente.");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
