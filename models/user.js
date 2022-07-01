'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            // define association here
        }
    }
    User.init({
        name: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.TEXT,
        otp: DataTypes.STRING,
        dob: DataTypes.DATE,
        age: DataTypes.INTEGER,
        gender: DataTypes.ENUM("Male", 'Female', 'Other'),
        status: DataTypes.ENUM("Active", 'Inactive'),
        emailVerifyAt: DataTypes.DATE,
        expireAt: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};