const db = require("../models");
const User = db.User;
const bcrypt = require('bcrypt');
const transport = require('../config/mail.js');

exports.getUsers = async(req, res) => {
    let users = await User.findAll({
        attributes: {
            exclude: ['password', 'otp', 'emailVerifyAt', 'expireAt']
        }
    });
    return res.status(200).json({ status: "success", code: 200, message: "User Fetched successfully", data: users });
}

exports.createUser = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let password = Math.random().toString(36).slice(-8);

        let user = {
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender,
            photo: req.file.path,
            age: req.body.age,
            password: await bcrypt.hash(password, salt)
        }

        User.create(user).then(async(data) => {
            return res.status(200).json({ status: "success", code: 200, message: "User Created successfully", data: {} });
        }).catch(err => {
            return res.status(500).json({ status: "error", code: 500, message: err.message || "Some error occurred while creating the User.", data: {} });
        });
    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    };
}
exports.updateUser = (req, res) => {
    try {
        let user = {
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender,
            age: req.body.age,
        }
        if (req.file != undefined) {
            user.photo = req.file.path;
        }
        User.update(user, {
            where: { id: req.body.id }
        }).then(result => {
            return res.status(200).json({ status: "success", code: 200, message: "User updated successfully", data: {} });
        }).catch(err => {
            return res.status(500).json({
                status: "error",
                code: 500,
                message: err.message || "Some error occurred while creating the User.",
                data: {}
            });
        });

    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    };
}
exports.deleteUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            where: { id }
        });
        await user.destroy();
        return res.status(200).json({ status: "success", code: 200, message: "User deleted successfully", data: {} });
    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    }

}

exports.findUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            where: { id },
            attributes: {
                exclude: ['password', 'otp', 'emailVerifyAt', 'expireAt']
            }
        });
        if (user) {
            return res.status(200).json({ status: "success", code: 200, message: "User find successfully", data: user });
        } else {
            return res.status(404).json({ status: "error", code: 404, message: "User Not Found", data: {} });
        }

    } catch (err) {
        return res.status(500).json({ status: "error", code: 500, message: err.message || "Something is wrong!", data: {} });
    }
}