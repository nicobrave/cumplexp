const Coupon = require("../models/Coupon");
const qrcode = require("qrcode");

const createCoupon = async (req, res) => {
  try {
    const { title, description, experienceType, benefit, availableQuantity, expirationDate } = req.body;

    const company = req.body.company || req.user?.companyId || req.companyId;

    if (!company) {
      return res.status(400).json({ message: "Company ID is required to create a coupon." });
    }

    // Generar un código único para el cupón basado en el ID del cupón generado
    const newCoupon = new Coupon({
      company,
      title,
      description,
      experienceType,
      benefit,
      availableQuantity,
      expirationDate,
    });

    await newCoupon.save();

    // Utilizar el ID del cupón recién guardado para generar el código QR
    const qrCode = await qrcode.toDataURL(newCoupon._id.toString());

    // Actualizar el cupón con el QR code generado
    newCoupon.qrCode = qrCode;
    await newCoupon.save();

    res.status(201).json({ message: "Cupón creado con éxito", coupon: newCoupon });
  } catch (error) {
    console.error("Error al crear el cupón:", error);
    res.status(500).json({ message: "Error al crear el cupón", error });
  }
};

const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findById(code); // Buscar el cupón por su ID

    if (!coupon) {
      return res.status(404).json({ valid: false, message: "Cupón no encontrado" });
    }

    if (coupon.redeemedQuantity >= coupon.availableQuantity) {
      return res.status(400).json({ valid: false, message: "Cupón agotado" });
    }

    // Incrementar la cantidad redimida
    coupon.redeemedQuantity += 1;

    // Si la cantidad disponible llega a 0, ocultar el cupón
    if (coupon.redeemedQuantity >= coupon.availableQuantity) {
      coupon.isVisible = false;
    }

    await coupon.save();

    res.status(200).json({ valid: true, message: "Cupón válido", coupon });
  } catch (error) {
    console.error("Error al validar el cupón:", error);
    res.status(500).json({ valid: false, message: "Error al validar el cupón", error });
  }
};

const getCoupons = async (req, res) => {
  try {
    // Solo obtener cupones que estén visibles
    const coupons = await Coupon.find({ isVisible: true }).populate('company');
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error al obtener los cupones:", error);
    res.status(500).json({ message: "Error al obtener cupones", error });
  }
};

// Exportar las funciones del controlador
module.exports = {
  createCoupon,
  getCoupons,
  validateCoupon,
};
