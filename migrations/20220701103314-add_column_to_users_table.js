'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Users',
                'dob', {
                    type: Sequelize.DATE
                }
            ),
            queryInterface.addColumn(
                'Users',
                'age', {
                    type: Sequelize.INTEGER
                }
            ),
            queryInterface.addColumn(
                'Users',
                'gender', {
                    type: Sequelize.ENUM("Male", 'Female', 'Other')
                }
            ),
            queryInterface.addColumn(
                'Users',
                'status', {
                    type: Sequelize.ENUM("Active", 'Inactive'),
                    defaultValue: 'Active'
                }
            )

        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('Users', 'dob'),
            queryInterface.removeColumn('Users', 'age'),
            queryInterface.removeColumn('Users', 'gender'),
            queryInterface.removeColumn('Users', 'status'),
        ]);
    }
};