const e = require('express');
const { check, validationResult } = require('express-validator');
const fs = require("fs");
const db = require("../models");
const User = db.User;

exports.userCreateValidation = [
    check('name', 'Name is requied')
    .not().
    isEmpty(),
    check('folder_name', 'Folder name is requied')
    .not().
    isEmpty(),
    check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true })
    .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { email: req.body.email } }).then((user) => {
                if (user) {
                    reject(new Error('E-mail already in use'))
                }
                resolve(true)

            }).catch(err => {
                if (err) {
                    reject(new Error('Server Error'))
                }
            });
        });
    }),
    check('gender').isIn(['Male', 'Female', 'Other']),
    check('dob').isISO8601().toDate(),
    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file != undefined) {
                fs.unlink(req.file.path, (err) => {
                    console.log(`successfully deleted ${req.file.path}`);
                });
            } else {
                return res.status(400).json({
                    status: "error",
                    code: 400,
                    message: "Validator Error",
                    data: [{
                        "value": "",
                        "msg": "Photo is requied",
                        "param": "photo",
                        "location": "body"
                    }]
                });
            }

            return res.status(400).json({ status: "error", code: 400, message: "Validator Error", data: errors.array() });
        }
        next();
    },
];

exports.userUpdateValidation = [
    check('id', 'ID is requied')
    .not().
    isEmpty(),
    check('name', 'Name is requied')
    .not().
    isEmpty(),
    check('folder_name', 'Folder name is requied')
    .not().
    isEmpty(),
    check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true })
    .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { email: req.body.email } }).then((user) => {
                if (user) {
                    if (user.id == req.body.id) {
                        resolve(true)
                    } else {
                        if (user) {
                            reject(new Error('E-mail already in use'))
                        }
                    }
                }
                resolve(true);
            }).catch(err => {
                if (err) {
                    reject(new Error('Server Error'))
                }
            });

        });
    }),
    check('gender').isIn(['Male', 'Female', 'Other']),
    check('dob').isISO8601().toDate(),
    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file != undefined) {
                fs.unlink(req.file.path, (err) => {
                    console.log(`successfully deleted ${req.file.path}`);
                });
            }
            return res.status(400).json({ status: "error", code: 400, message: "Validator Error", data: errors.array() });
        }
        next();
    },
];