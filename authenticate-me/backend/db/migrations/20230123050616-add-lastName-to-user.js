'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

options.tableName = 'Users';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'lastName', {
        type: Sequelize.STRING
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'lastName');
  }
};
