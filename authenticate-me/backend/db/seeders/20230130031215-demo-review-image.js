'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "A jpg of a bottle"
      },
      {
        reviewId: 2,
        url: "A png of an old abandoned cottage"
      },
      {
        reviewId: 3,
        url: "A jpg of a cellar"
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      reviewId: {[Op.in]: [1, 2, 3]}
    }, {});

  }
};
