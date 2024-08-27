const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Registro de la empresa
exports.registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
    });

    await newCompany.save();

    const token = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, company: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar la empresa" });
  }
};

// Inicio de sesión de la empresa
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos." });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos." });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, company });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
