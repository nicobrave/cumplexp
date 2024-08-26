import React, { useState } from 'react';
import axios from 'axios';

function CompanyRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/companies/register', formData);
      console.log(response.data);
      // Redirect or show success message
    } catch (error) {
      console.error('Error registering company:', error);
      // Show error message
    }
  };

  return (
    <div>
      <h2>Company Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Company Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <textarea name="description" placeholder="Company Description" onChange={handleChange}></textarea>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CompanyRegister;