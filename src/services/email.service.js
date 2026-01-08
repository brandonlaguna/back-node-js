const transporter = require("../utils/transporter.js");
const fs = require("fs");
const handlebars = require("handlebars");

const sendEmail = async (to, subject, templateData) => {
  try {
    const source = fs.readFileSync("./src/html/template.html", "utf-8");
    const template = handlebars.compile(source);

    const html = template(templateData);

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT_USER,
      to,
      subject,
      html: html,
      replyTo: templateData.userEmail,
    };

    await transporter.transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const newSubscriber = async (to, subject, templateData) => {
  try {
    const source = fs.readFileSync("./src/html/newsubscriber.html", "utf-8");
    const template = handlebars.compile(source);

    const html = template(templateData);

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT_USER,
      to,
      subject,
      html: html,
      replyTo: templateData.userEmail,
    };
    await transporter.transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendEmail,
  newSubscriber,
};
