import React from 'react';

function CouponCard({ coupon }) {
  return (
    <div className="coupon-card">
      <h3>{coupon.title}</h3>
      <p>{coupon.description}</p>
      <p>Benefit: {coupon.benefit}</p>
      <p>Expires: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
    </div>
  );
}

export default CouponCard;