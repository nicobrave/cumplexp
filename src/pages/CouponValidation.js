import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useZxing } from 'react-zxing';

function CouponValidation() {
  const [result, setResult] = useState(null);
  const location = useLocation();
  const { ref } = useZxing({
    onResult(result) {
      handleScan(result.getText());
    }
  });

  const handleScan = (data) => {
    if (data) {
      axios.post('/api/coupons/validate', { code: data })
        .then(response => setResult(response.data))
        .catch(error => console.error('Error validating coupon:', error));
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      axios.post('/api/coupons/validate', { code })
        .then(response => setResult(response.data))
        .catch(error => console.error('Error validating coupon:', error));
    }
  }, [location]);

  return (
    <div>
      <h2>Validación de Cupón</h2>
      <div>
        <video ref={ref} style={{ width: '100%' }} />
      </div>
      {result && (
        <div>
          <h3>{result.valid ? 'Cupón válido' : 'Cupón inválido'}</h3>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default CouponValidation;
