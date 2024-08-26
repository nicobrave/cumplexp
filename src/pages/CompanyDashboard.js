import React, { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";

function CompanyDashboard() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/companies/coupons");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div>
      <h2>Company Dashboard</h2>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <CouponCard key={coupon._id} coupon={coupon} />
        ))}
      </div>
      {/* Add form to create new coupons */}
    </div>
  );
}

export default CompanyDashboard;
