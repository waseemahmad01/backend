const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    auth:{
        user: 'wa031522@gmail.com',
        pass: "22-02818"
    }
});

module.exports = transporter;