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
        url: "https://media.istockphoto.com/id/1159222457/photo/historic-bodiam-castle-and-moat-in-east-sussex.jpg?s=1024x1024&w=is&k=20&c=pauvNt5zWEPZMKN6VW1QtDjA0ME8iWBrp78DMAFDjuc=",
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
        url: "https://media.istockphoto.com/id/178559422/photo/american-craftsman-house.jpg?s=612x612&w=is&k=20&c=Zks4saOJ3cCkhqZfokihlcSSaJzs8F95-HFcoTvXgpw=",
        preview: true
      },
      {
        spotId: 3,
        url: "https://media.istockphoto.com/id/1189920127/photo/meteor-crater-natural-landmark-near-winslow-az.jpg?s=612x612&w=is&k=20&c=2aaqY2tiEaI3-XKmAxE5HXxd-j8LqOctHHkOYBXeNa0=",
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
