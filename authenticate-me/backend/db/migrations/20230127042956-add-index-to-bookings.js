'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

options.tableName = 'Bookings'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex(options, ['spotId', 'startDate', 'endDate'], {
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex(options, ['spotId', 'startDate', 'endDate']);
  }
};
