// src/controllers/email.controller.js

const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");
const { success, error } = require("../utils/response");
const subscriberService = require("../services/subscriber.service");

const getInTouch = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validar que los datos estén presentes
    if (!name || !email || !message) {
      return error(res, "Por favor proporciona nombre, email y mensaje", 400);
    }

    // Datos para el template
    const templateData = {
      userName: name,
      userEmail: email,
      message: message,
    };

    const subscriberData = {
      name: name,
      email: email,
      phone: "",
      type: "contact",
    };

    const saveNewSubscriber = subscriberService.newSubscriber(subscriberData);
    if (!saveNewSubscriber) {
      return error(
        res,
        "No se puede contactar en este momento, intentelo mas tarde",
        400
      );
    }

    // Enviar email a la organización
    const emailSent = await emailService.sendEmail(
      "brandonlagunarl@gmail.com", // process.env.GMAIL_ACCOUNT_USER,
      `Nuevo mensaje de contacto de ${name}`,
      templateData
    );

    if (emailSent) {
      return success(res, {}, "Mensaje enviado correctamente", 200);
    } else {
      return error(res, "Error al enviar el mensaje", 500);
    }
  } catch (e) {
    console.error("Error en getInTouch:", e);
    return error(res, e.message || "Error al enviar el mensaje", 500);
  }
};

const subscribeNewsLetter = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validar que los datos estén presentes
    if (!email || !phone) {
      return error(res, "Por favor proporciona email y telefono", 400);
    }

    // Datos para el template
    const templateData = {
      userEmail: email,
      userPhone: phone,
    };

    const subscriberData = {
      name: email,
      email: email,
      phone: phone,
      type: "newsletter",
    };

    const saveNewSubscriber = subscriberService.newSubscriber(subscriberData);
    if (!saveNewSubscriber) {
      return error(
        res,
        "No se puede suscrbir en este momento, intentelo mas tarde",
        400
      );
    }

    // Enviar email a la organización
    const emailSent = await emailService.newSubscriber(
      "brandonlagunarl@gmail.com", // process.env.GMAIL_ACCOUNT_USER,
      `Nuevo Suscriptor - ${email}`,
      templateData
    );

    if (emailSent) {
      return success(res, {}, "Mensaje enviado correctamente", 200);
    } else {
      return error(res, "Error al enviar el mensaje", 500);
    }
  } catch (e) {
    console.error("Error en getInTouch:", e);
    return error(res, e.message || "Error al enviar el mensaje", 500);
  }
};

module.exports = { getInTouch, subscribeNewsLetter };
