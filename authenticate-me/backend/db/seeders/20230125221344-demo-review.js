// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
  
//    options.tableName = 'Reviews';
//    await queryInterface.bulkInsert(options, [
//       {
//         spotId: 1,
//         userId: 1,
//         review: "This place got a lotta Scrumpy",
//         stars: 4
//       },
//       {
//         spotId: 2,
//         userId: 2,
//         review: "Monke like place",
//         stars: 5
//       }
//     ], {});
//   },

//   async down (queryInterface, Sequelize) {
//     options.tableName = 'Reviews';
//     const Op = Sequelize.Op;

//     return queryInterface.bulkDelete(options, {
//       stars: {[Op.in]: [4, 5]}
//     }, {})
//   }
// };
