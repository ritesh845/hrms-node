const nodemailer = require('nodemailer');
require('dotenv').config();
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports = transport;