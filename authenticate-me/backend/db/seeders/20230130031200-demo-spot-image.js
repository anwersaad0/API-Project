'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "Spot 1's preview",
        preview: true
      },
      {
        spotId: 1,
        url: "Not spot 1's preview",
        preview: false
      },
      {
        spotId: 2,
        url: "Not spot 2's preview",
        preview: false
      },
      {
        spotId: 2,
        url: "Spot 2's preview",
        preview: true
      },
      {
        spotId: 3,
        url: "Spot 3's preview",
        preview: true
      },
      {
        spotId: 3,
        url: "Not spot 3's preview",
        preview: false
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      spotId: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
