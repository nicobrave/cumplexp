const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getCoupons,
  validateCoupon,
  getCompanyCoupons,
} = require("../controllers/couponController");

// Ruta para obtener todos los cupones
router.get("/", getCoupons);

// Ruta para crear un nuevo cupón
router.post("/create", createCoupon);

// Ruta para validar y redimir un cupón
router.post("/validate", validateCoupon);

// Ruta para obtener cupones de una empresa específica
router.get("/company/:companyId", getCompanyCoupons);

module.exports = router;
