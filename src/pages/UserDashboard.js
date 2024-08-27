import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CouponCard from '../components/CouponCard';
import './UserDashboard.css';
import QRCode from 'qrcode.react'; // Importación necesaria para el QR code

function UserDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('/api/coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  const handleFavoriteClick = (coupon) => {
    if (favorites.some(fav => fav._id === coupon._id)) {
      setFavorites(favorites.filter(fav => fav._id !== coupon._id));
      setCoupons([...coupons, coupon]);
    } else {
      setFavorites([...favorites, coupon]);
      setCoupons(coupons.filter(c => c._id !== coupon._id));
    }
  };

  const handleViewClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const closeModal = () => {
    setSelectedCoupon(null);
  };

  const handleRedeemClick = () => {
    if (selectedCoupon) {
      setRedeemedCoupons([...redeemedCoupons, selectedCoupon]);
      setCoupons(coupons.filter(c => c._id !== selectedCoupon._id));
      setSelectedCoupon(null);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to Your Dashboard</h2>

      <div className="coupon-section">
        <h3>Mis cupones canjeados</h3>
        <div className="coupon-grid">
          {redeemedCoupons.length > 0 ? (
            redeemedCoupons.map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onViewClick={() => handleViewClick(coupon)}
              />
            ))
          ) : (
            <p>No has canjeado cupones aún.</p>
          )}
        </div>
      </div>

      <div className="coupon-section">
        <h3>Mis cupones guardados</h3>
        <div className="coupon-grid">
          {favorites.length > 0 ? (
            favorites.map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onViewClick={() => handleViewClick(coupon)}
                onFavoriteClick={() => handleFavoriteClick(coupon)}
              />
            ))
          ) : (
            <p>No tienes cupones guardados.</p>
          )}
        </div>
      </div>

      <div className="coupon-section">
        <h3>Todos los cupones disponibles</h3>
        <div className="coupon-grid">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onViewClick={() => handleViewClick(coupon)}
                onFavoriteClick={() => handleFavoriteClick(coupon)}
              />
            ))
          ) : (
            <p>No hay cupones disponibles.</p>
          )}
        </div>
      </div>

      {selectedCoupon && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>X</button>
            <h3>{selectedCoupon.title}</h3>
            {redeemedCoupons.some(c => c._id === selectedCoupon._id) ? (
              <div className="qr-code">
                <QRCode value={selectedCoupon.qrCode} size={150} />
              </div>
            ) : (
              <>
                <p><strong>Description:</strong> {selectedCoupon.description}</p>
                <p><strong>Experience Type:</strong> {selectedCoupon.experienceType}</p>
                <p><strong>Benefit:</strong> {selectedCoupon.benefit}</p>
                <p><strong>Available:</strong> {selectedCoupon.availableQuantity}</p>
                <p><strong>Expires on:</strong> {new Date(selectedCoupon.expirationDate).toLocaleDateString()}</p>
                <div className="modal-buttons">
                  <button className="modal-cancel-button" onClick={closeModal}>Cancelar</button>
                  <button className="modal-redeem-button" onClick={handleRedeemClick}>Canjear</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
