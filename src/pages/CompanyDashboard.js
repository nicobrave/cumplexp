import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompanyDashboard.css"; // Archivo CSS para los estilos
import QRCode from "qrcode.react"; // Biblioteca para generar el QR
import { useNavigate } from "react-router-dom"; // Para la navegación

function CompanyDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Estado para el cupón seleccionado
  const [createdCoupons, setCreatedCoupons] = useState(0);
  const [redeemedCoupons, setRedeemedCoupons] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const companyId = localStorage.getItem("companyId");
        const response = await axios.get(`/api/coupons/company?companyId=${companyId}`);
        setCoupons(response.data);

        // Calcula el número de cupones creados y redimidos
        const totalCreated = response.data.length;
        const totalRedeemed = response.data.reduce((total, coupon) => total + coupon.redeemedQuantity, 0);

        setCreatedCoupons(totalCreated);
        setRedeemedCoupons(totalRedeemed);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const closeModal = () => {
    setSelectedCoupon(null);
  };

  const handleNewCouponClick = () => {
    navigate("/company/create-coupon");
  };

  return (
    <div className="dashboard-container">
      <h2>Your Coupons</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Created Coupons</h3>
          <p>{createdCoupons}</p>
        </div>
        <div className="stat-card">
          <h3>Redeemed Coupons</h3>
          <p>{redeemedCoupons}</p>
        </div>
      </div>

      <button className="new-coupon-button" onClick={handleNewCouponClick}>
        + Create New Coupon
      </button>

      <div className="coupon-grid">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div className="coupon-card" key={coupon._id} onClick={() => handleCouponClick(coupon)}>
              <h3>{coupon.title}</h3>
              <p><strong>Company:</strong> {coupon.company.name}</p>
              <p><strong>Benefit:</strong> {coupon.benefit}</p>
              <p><strong>Available:</strong> {coupon.availableQuantity}</p>
              <p><strong>Expires on:</strong> {new Date(coupon.expirationDate).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No coupons available.</p>
        )}
      </div>

      {selectedCoupon && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <h3>{selectedCoupon.title}</h3>
            <p><strong>Description:</strong> {selectedCoupon.description}</p>
            <p><strong>Experience Type:</strong> {selectedCoupon.experienceType}</p>
            <p><strong>Benefit:</strong> {selectedCoupon.benefit}</p>
            <p><strong>Available:</strong> {selectedCoupon.availableQuantity}</p>
            <p><strong>Expires on:</strong> {new Date(selectedCoupon.expirationDate).toLocaleDateString()}</p>
            <div className="qr-code">
              <QRCode value={selectedCoupon.qrCode} size={150} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDashboard;
