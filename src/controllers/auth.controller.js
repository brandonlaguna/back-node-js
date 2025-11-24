// src/controllers/auth.controller.js

const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");
const { success, error } = require("../utils/response");

const secret = process.env.JWT_SECRET;

// Controlador para la ruta de login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Llama al servicio para encontrar al usuario
    const user = await authService.findUser(username, password);

    if (!user) {
      return error(res, "Credenciales incorrectas", 400);
    }

    // Si el usuario existe, se crea el JWT
    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ user }, secret, { expiresIn: "1d" });

    return success(res, { token, refreshToken }, "Login Correcto");
  } catch (e) {
    return error(error, "Error al iniciar sesion, intentelo nuevamente", 500);
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, secret);
    console.log("🚀 ~ refreshToken ~ decoded:", decoded);

    const token = jwt.sign({ user: decoded.user }, secret, {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign({ user: decoded.user }, secret, {
      expiresIn: "30m",
    });
    return success(
      res,
      { token, refreshToken: newRefreshToken },
      "Login correcto",
      200
    );
  } catch (e) {
    return error(res, e.message, 500);
  }
};

const register = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      firstName,
      secondName,
      lastName,
      secondLastName,
      ROLE,
      CLAIMS,
      email,
      description,
      phone,
      address,
      photo,
      birthDate,
      facebookId,
      instagramId,
      twitterId,
      linkedinId,
    } = req.body;

    const existing = await authService.findUserByUsername(username);
    if (existing) {
      return error(res, "Usuario ya existe", 400);
    }

    const newUser = await authService.createUser({
      name,
      username,
      password,
      firstName,
      secondName,
      lastName,
      secondLastName,
      email,
      description,
      phone,
      address,
      photo,
      birthDate,
      facebookId,
      instagramId,
      twitterId,
      linkedinId,
      ROLE,
      CLAIMS,
    });
    return success(res, newUser, "Usuario creado correctamente", 200);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

module.exports = {
  login,
  refreshToken,
  register,
};
