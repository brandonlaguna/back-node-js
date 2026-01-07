import transporter from "../utils/transporter.js";
import fs from "fs";
import handlebars from "handlebars";

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const source = fs.readFileSync("../html/template.html", "utf-8");
    const template = handlebars.compile(source);

    const html = template({ name: "Pedro", message: "¡Hola!" });

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT_USER,
      to,
      subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
