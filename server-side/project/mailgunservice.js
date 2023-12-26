// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// // const axios = require('axios');
// const express = require('express');
// const router = express.Router();
// const mailgunService = require("./mailgunservice");
// const mailgun = new Mailgun(formData);
// console.log("in mailgun service")
// const mg = mailgun.client({
//     username: "api",
//     key: "000000000",
// });
// sendMail = (req, res) => {
//     console.log("in sendmail")
//     const toEmail = "chana.dnml@gmail.com"
//     const fromEmail = "chani165165@gmail.com"
//     const subject = "This is a test message"
//     const message = "please tell me your name"
//         // console.log("process.env.MAILGUN_DOMAIN: " + string(process.env))
//     mg.messages.create(process.env.MAILGUN_DOMAIN, {
//         from: fromEmail,
//         to: toEmail,
//         subject: subject,
//         text: message,
//     });
// };

// module.exports = sendMail();