'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        startDate: new Date("2023-02-14"),
        endDate: new Date("2023-02-21")
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date("2023-04-20"),
        endDate: new Date("2023-04-23")
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date("2023-03-05"),
        endDate: new Date("2023-03-12")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      startDate: {[Op.in]: ["2023-02-14", "2023-04-20", "2023-03-05"]}
    }, {});
  }
};
