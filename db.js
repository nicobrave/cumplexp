require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI); // Para depuración
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
