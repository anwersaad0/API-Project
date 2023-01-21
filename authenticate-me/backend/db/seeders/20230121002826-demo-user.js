'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demoman@user.io',
        username: 'Degroot1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'donkong@user.io',
        username: 'DKbanana',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'genericUser@user.io',
        username: 'genericUser',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['Degroot1', 'DKbanana', 'genericUser']}
    }, {});
  }
};
