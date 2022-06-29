const bcrypt = require('bcrypt');
const db = require("../models");
let jwt = require('jsonwebtoken');
const User = db.User;
const transport = require('../config/mail.js')
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('../hrms-node/views/mail/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('../hrms-node/views/mail/'),
};
transport.use('compile', hbs(handlebarOptions))


exports.login = (req, res) => {
    try {
        User.findAll({
            where: {
                email: req.body.email
            }

        }).then(user => {
            if (user.length == 0 || user.length < 1) {
                return res.status(401).json({ status: "error", code: 401, message: "This credentails doesn't match our records.", data: {} });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0].id
                    }, 'secrettext', {
                        expiresIn: "1h"
                    });

                    delete user[0].dataValues.password
                    let response = {
                        token: token,
                        user: user[0]
                    }

                    return res.status(200).json({ status: "success", code: 200, message: "Login successfully", data: response });
                } else {
                    return res.status(401).json({ status: "error", code: 401, message: "This credentails doesn't match our records.", data: {} });
                }
            })

        }).catch(err => {
            return res.status(500).json({ status: "error", code: 500, message: err.message || "Some error occurred while creating the User.", data: {} });
        });
    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    }

}
exports.register = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(req.body.password, salt);
        const otp = Math.floor(1000 + Math.random() * 9000);;
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            otp: otp
        }
        User.create(user).then(async(data) => {

            await transport.sendMail({
                from: process.env.MAIL_FROM_ADDRESS,
                to: req.body.email,
                template: 'verification-email',
                subject: 'Email Verification Mail',
                context: {
                    subject: 'Email Verification Mail',
                    name: req.body.name,
                    otp: otp
                }
            });
            delete data.dataValues.password
            return res.status(200).json({ status: "success", code: 200, message: "Registration successfully", data: data });
        }).catch(err => {
            return res.status(500).json({ status: "error", code: 500, message: err.message || "Some error occurred while creating the User.", data: {} });
        });
    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    };
}

exports.verifyEmail = async(req, res) => {
    try {
        await User.findAll({
            where: {
                email: req.body.email
            }
        }).then(async(user) => {
            if (user.length === 0) {
                return res.status(404).json({ status: "error", code: 404, message: "User Not Found", data: {} });
            }
            if (user[0].emailVerifyAt != null) {
                return res.status(200).json({ status: "success", code: 200, message: "Email Already Verified", data: {} });
            } else {
                if (user[0].otp != req.body.otp) {
                    return res.status(400).json({ status: "error", code: 400, message: "Otp not matched", data: {} });
                } else {
                    let userUpdate = {
                        otp: null,
                        emailVerifyAt: Date.now()
                    }
                    await User.update(userUpdate, {
                        where: { id: user[0].id }
                    }).then(result => {
                        return res.status(200).json({ status: "success", code: 200, message: "Email Verified successfully", data: {} });
                    });
                }
            }
        }).catch(err => {
            return res.status(500).json({ status: "error", code: 500, message: err.message || "Some error occurred while creating the User.", data: {} });
        })

    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    }
}