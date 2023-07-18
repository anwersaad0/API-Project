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
        state: "N/A",
        country: "Turkey",
        lat: 0.04,
        lng: 0.66,
        name: "Desolate Pit",
        description: "Another description lol",
        price: 7000.00
      },
      {
        ownerId: 1,
        address: "72 Example Ct",
        city: "Frankfurt",
        state: "N/A",
        country: "Germany",
        lat: 3.332,
        lng: -17.449,
        name: "Cool Place German Edition",
        description: "You heard us, a cool place oddly located in the middle of Germany for some reason.",
        price: 455.00
      },
      {
        ownerId: 2,
        address: "134 Robertson Av",
        city: "Little Rock",
        state: "Arkansas",
        country: "United States",
        lat: 14.678,
        lng: -9.524,
        name: "The Little Rock Fun Place",
        description: "You heard us, a fun place oddly located in the middle of Little Rock for some reason.",
        price: 215.00
      },
      {
        ownerId: 3,
        address: "525 Thisiskuul Ct",
        city: "Oxford",
        state: "N/A",
        country: "United Kingdom",
        lat: 55.987,
        lng: -6.543,
        name: "Totally Not Sus UK Spot",
        description: "Definitely a safe, normal place. Nothing otherworldly to find with this spot.",
        price: 455.00
      },
      {
        ownerId: 4,
        address: "777 Lucky Dr",
        city: "Seattle",
        state: "Washington",
        country: "Unites States",
        lat: 22.444,
        lng: 6.248,
        name: "My Lucky Place",
        description: "Rumors say anything fantastic can happen to guests here, from successful proposals to being approached for a paying job.",
        price: 777.00
      },
      {
        ownerId: 4,
        address: "343 Oofsfield Ct",
        city: "Somecity",
        state: "Somestate",
        country: "Unites States",
        lat: -4.444,
        lng: 17.248,
        name: "Just some field",
        description: "For our low price, patrons can stay in this desolate field with nobody watching from outside.",
        price: 7.00
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      name: {[Op.in]: ["Degroot Keep", "Run-down House", "Desolate Pit", "Cool Place German Edition",
      "The Little Rock Fun Place", "Totally Not Sus UK Spot", "My Lucky Place", "Just some field"]}
    }, {})
  }
};
