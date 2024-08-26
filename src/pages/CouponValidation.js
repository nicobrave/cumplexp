import React, { useState } from 'react';
import axios from 'axios';

function CouponValidation() {
  const [couponCode, setCouponCode] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/coupons/validate', { code: couponCode });
      setValidationResult(response.data);
    } catch (error) {
      console.error('Error validating coupon:', error);
      setValidationResult({ valid: false, message: 'Error validating coupon' });
    }
  };

  return (
    <div>
      <h2>Validate Coupon</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={couponCode} 
          onChange={(e) => setCouponCode(e.target.value)} 
          placeholder="Enter coupon code" 
        />
        <button type="submit">Validate</button>
      </form>
      {validationResult && (
        <div>
          <p>{validationResult.valid ? 'Valid coupon' : 'Invalid coupon'}</p>
          <p>{validationResult.message}</p>
        </div>
      )}
    </div>
  );
}

export default CouponValidation;