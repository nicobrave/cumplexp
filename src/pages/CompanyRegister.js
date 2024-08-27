import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CompanyRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    industry: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/companies/register', formData);
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/company/dashboard', { replace: true });
      } else {
        console.error('No token received');
      }
    } catch (error) {
      console.error('Error registering company:', error);
    }
  };

  return (
    <div className="App">
      <h2>Register Your Company</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Company Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your company name"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />

        <label htmlFor="industry">Industry</label>
        <input
          type="text"
          id="industry"
          name="industry"
          placeholder="Enter your industry"
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CompanyRegister;
