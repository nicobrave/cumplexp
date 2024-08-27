import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateCoupon.css";

function CreateCoupon() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experienceType: "",
    benefit: "",
    availableQuantity: "",
    expirationDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const company = localStorage.getItem("companyId");
      const response = await axios.post("/api/coupons/create", {
        ...formData,
        company,
      });
      console.log(response.data);
      navigate("/company/dashboard");
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  const handleCancel = () => {
    navigate("/company/dashboard");
  };

  return (
    <div className="create-coupon-container">
      <h2>Create New Coupon</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="experienceType"
          placeholder="Experience Type"
          value={formData.experienceType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="benefit"
          placeholder="Benefit"
          value={formData.benefit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="availableQuantity"
          placeholder="Available Quantity"
          value={formData.availableQuantity}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <button type="submit">Create Coupon</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCoupon;
