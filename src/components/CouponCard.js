import React from 'react';
import './CouponCard.css'; // Asegúrate de que este archivo exista y tenga los estilos.

function CouponCard({ coupon, onViewClick, onFavoriteClick, isFavorite = false }) {
  return (
    <div className="coupon-card">
      <div
        className={`favorite-icon ${isFavorite ? 'favorite' : 'not-favorite'}`}
        onClick={() => onFavoriteClick(coupon)}
      >
        ⭐
      </div>
      <h3>{coupon.title}</h3>
      <p><strong>Company:</strong> {coupon.company.name}</p>
      <p><strong>Benefit:</strong> {coupon.benefit}</p>
      <p><strong>Available:</strong> {coupon.availableQuantity}</p>
      <p><strong>Expires on:</strong> {new Date(coupon.expirationDate).toLocaleDateString()}</p>
      <button className="view-coupon-button" onClick={() => onViewClick(coupon)}>
        Ver Cupón
      </button>
    </div>
  );
}

export default CouponCard;
