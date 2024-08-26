// client/src/pages/Home.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';  // Asegúrate de importar los estilos aquí

const Home = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      // Intentar iniciar sesión como usuario
      const resUser = await axios.post('/api/users/login', formData);
      if (resUser.data.token) {
        localStorage.setItem('token', resUser.data.token);
        navigate('/user/dashboard');
        return;
      }
    } catch (err) {
      console.error('Error al iniciar sesión como usuario:', err.response?.data);
    }

    try {
      // Intentar iniciar sesión como empresa
      const resCompany = await axios.post('/api/companies/login', formData);
      if (resCompany.data.token) {
        localStorage.setItem('token', resCompany.data.token);
        navigate('/company/dashboard');
        return;
      }
    } catch (err) {
      console.error('Error al iniciar sesión como empresa:', err.response?.data);
    }

    alert('Credenciales incorrectas. Por favor, intenta nuevamente.');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>¿No tienes una cuenta? Regístrate</h3>
        <Link to="/user/register">
          <button>Registrarse como Usuario</button>
        </Link>
        <Link to="/company/register" style={{ marginLeft: '10px' }}>
          <button>Registrarse como Empresa</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
