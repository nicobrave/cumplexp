require('dotenv').config();
const express = require("express");
const { connectToDatabase } = require("./db");

async function startServer() {
  try {
    await connectToDatabase();

    const app = express();
    app.use(express.json());

    // Rutas para las empresas
    app.use("/api/companies", require("./server/routes/companies"));
    
    // Rutas para los cupones
    app.use("/api/coupons", require("./server/routes/coupons"));
    
    // Rutas para los usuarios
    app.use("/api/users", require("./server/routes/users"));

    // Asegurarse de que todas las rutas se configuran correctamente
    const couponController = require("./server/controllers/couponController");

    // Ruta para obtener los cupones de una empresa
    app.get("/api/coupons/company", couponController.getCompanyCoupons);

    // Ruta para crear un nuevo cupón
    app.post("/api/coupons/create", couponController.createCoupon);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
