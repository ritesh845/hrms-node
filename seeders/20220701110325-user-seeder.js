'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface, Sequelize) {

        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash("123456789", salt);

        return queryInterface.bulkInsert('Users', [{
                name: 'John',
                email: 'john@example.com',
                password: password,
                emailVerifyAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Densy',
                email: 'dency@example.com',
                password: password,
                emailVerifyAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'fancy',
                email: 'fancy@example.com',
                password: password,
                emailVerifyAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};