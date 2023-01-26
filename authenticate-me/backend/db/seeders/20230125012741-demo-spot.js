'use strict';
//const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "420 Degrootkeep",
        city: "Ulapool",
        state: "none",
        country: "Scotland",
        lat: 0.56,
        lng: 0.12,
        name: "Degroot Keep",
        description: "A description lol",
        price: 400000.00
      },
      {
        ownerId: 2,
        address: "609 Craqshaq Lane",
        city: "Detroit",
        state: "Michigan",
        country: "United States",
        lat: 0.16,
        lng: 0.21,
        name: "Run-down House",
        description: "A description lol",
        price: 200.00
      },
      {
        ownerId: 3,
        address: "646 Unknown",
        city: "Batman",
        state: "none",
        country: "Turkey",
        lat: 0.04,
        lng: 0.66,
        name: "Desolate Pit",
        description: "Another description lol",
        price: 7000.00
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      name: {[Op.in]: ["Degroot Keep", "Run-down House", "Desolate Pit"]}
    }, {})
  }
};
