'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            mobile: {
                type: Sequelize.STRING(15)
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            otp: {
                type: Sequelize.STRING(4)
            },
            emailVerifyAt: {
                type: Sequelize.DATE
            },
            expireAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};