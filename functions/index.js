const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

const app = express();
app.use(cors({
    origin: true
}));

app.post("/", (req, res) => {
    const {
        body
    } = req;
    // const isValidMessage = body.message && body.to && body.subject;
    const isValidMessage = body.name && body.email && body.subject && body.message;

    if (!isValidMessage) {
        return res.status(400).send({
            message: "invalid request"
        });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'antonio.alcantar@steveanthonysolutions.com',
            pass: 'ayixicmlaynsykio'
        }
    });

    const mailOptions = {
        from: 'antonio.alcantar@steveanthonysolutions.com',
        // to: body.to,
        to: 'antonio.alcantar@steveanthonysolutions.com',
        subject: body.subject,
        text: body.name + ' con el email ' + body.email + ' ha enviado el siguiente mensaje: ' + body.message
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "error " + err.message
            });
        }

        return res.send({
            message: "email sent"
        });
    });
});

module.exports.mailer = functions.https.onRequest(app);