import React, { useState } from 'react';
import axios from 'axios';

function UserRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    preferences: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', formData);
      console.log(response.data);
      // Redirigir al usuario o mostrar mensaje de éxito
    } catch (error) {
      console.error('Error registering user:', error);
      // Mostrar mensaje de error
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="date" name="birthdate" onChange={handleChange} required />
        <input type="text" name="preferences" placeholder="Preferences" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;