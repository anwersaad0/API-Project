'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
   options.tableName = 'Reviews';
   await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        review: "This place got a lotta Scrumpy",
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: "Monke not like place very much",
        stars: 2
      },
      {
        spotId: 1,
        userId: 3,
        review: "Never seen such a magnificent wine collection",
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: "What a cool AND German place. Example comment by the way.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: "This is indeed a fun place, but not completelyt fun. The bedrooms have no windows.",
        stars: 4
      },
      {
        spotId: 6,
        userId: 2,
        review: "Hang on, this isn't the local Applebees. Why am I in the UK?",
        stars: 2
      },
      {
        spotId: 7,
        userId: 1,
        review: "I stayed here one night, which somehow caused 343 to make a good Halo title for once. Best place ever!",
        stars: 5
      },
      {
        spotId: 8,
        userId: 3,
        review: "I wasn't completely alone there. I could see the prarie dogs watching my every move. Real scary!",
        stars: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      stars: {[Op.in]: [4, 2, 5, 1]}
    }, {})
  }
};
