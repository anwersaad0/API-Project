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
        url: "https://media.istockphoto.com/id/1159222457/photo/historic-bodiam-castle-and-moat-in-east-sussex.jpg?s=1024x1024&w=is&k=20&c=pauvNt5zWEPZMKN6VW1QtDjA0ME8iWBrp78DMAFDjuc=",
        preview: false
      },
      {
        spotId: 1,
        url: "https://media.istockphoto.com/id/1159222457/photo/historic-bodiam-castle-and-moat-in-east-sussex.jpg?s=1024x1024&w=is&k=20&c=pauvNt5zWEPZMKN6VW1QtDjA0ME8iWBrp78DMAFDjuc=",
        preview: false
      },
      {
        spotId: 1,
        url: "https://media.istockphoto.com/id/1159222457/photo/historic-bodiam-castle-and-moat-in-east-sussex.jpg?s=1024x1024&w=is&k=20&c=pauvNt5zWEPZMKN6VW1QtDjA0ME8iWBrp78DMAFDjuc=",
        preview: false
      },
      {
        spotId: 1,
        url: "https://media.istockphoto.com/id/1159222457/photo/historic-bodiam-castle-and-moat-in-east-sussex.jpg?s=1024x1024&w=is&k=20&c=pauvNt5zWEPZMKN6VW1QtDjA0ME8iWBrp78DMAFDjuc=",
        preview: false
      },
      {
        spotId: 2,
        url: "https://media.istockphoto.com/id/178559422/photo/american-craftsman-house.jpg?s=612x612&w=is&k=20&c=Zks4saOJ3cCkhqZfokihlcSSaJzs8F95-HFcoTvXgpw=",
        preview: true
      },
      {
        spotId: 2,
        url: "https://media.istockphoto.com/id/178559422/photo/american-craftsman-house.jpg?s=612x612&w=is&k=20&c=Zks4saOJ3cCkhqZfokihlcSSaJzs8F95-HFcoTvXgpw=",
        preview: false
      },
      {
        spotId: 2,
        url: "https://media.istockphoto.com/id/178559422/photo/american-craftsman-house.jpg?s=612x612&w=is&k=20&c=Zks4saOJ3cCkhqZfokihlcSSaJzs8F95-HFcoTvXgpw=",
        preview: false
      },
      {
        spotId: 2,
        url: "https://media.istockphoto.com/id/178559422/photo/american-craftsman-house.jpg?s=612x612&w=is&k=20&c=Zks4saOJ3cCkhqZfokihlcSSaJzs8F95-HFcoTvXgpw=",
        preview: false
      },
      {
        spotId: 2,
        url: "https://media.istockphoto.com/id/178559422/photo/american-craftsman-house.jpg?s=612x612&w=is&k=20&c=Zks4saOJ3cCkhqZfokihlcSSaJzs8F95-HFcoTvXgpw=",
        preview: false
      },
      {
        spotId: 3,
        url: "https://media.istockphoto.com/id/1189920127/photo/meteor-crater-natural-landmark-near-winslow-az.jpg?s=612x612&w=is&k=20&c=2aaqY2tiEaI3-XKmAxE5HXxd-j8LqOctHHkOYBXeNa0=",
        preview: true
      },
      {
        spotId: 3,
        url: "https://media.istockphoto.com/id/1189920127/photo/meteor-crater-natural-landmark-near-winslow-az.jpg?s=612x612&w=is&k=20&c=2aaqY2tiEaI3-XKmAxE5HXxd-j8LqOctHHkOYBXeNa0=",
        preview: false
      },
      {
        spotId: 3,
        url: "https://media.istockphoto.com/id/1189920127/photo/meteor-crater-natural-landmark-near-winslow-az.jpg?s=612x612&w=is&k=20&c=2aaqY2tiEaI3-XKmAxE5HXxd-j8LqOctHHkOYBXeNa0=",
        preview: false
      },
      {
        spotId: 3,
        url: "https://media.istockphoto.com/id/1189920127/photo/meteor-crater-natural-landmark-near-winslow-az.jpg?s=612x612&w=is&k=20&c=2aaqY2tiEaI3-XKmAxE5HXxd-j8LqOctHHkOYBXeNa0=",
        preview: false
      },
      {
        spotId: 3,
        url: "https://media.istockphoto.com/id/1189920127/photo/meteor-crater-natural-landmark-near-winslow-az.jpg?s=612x612&w=is&k=20&c=2aaqY2tiEaI3-XKmAxE5HXxd-j8LqOctHHkOYBXeNa0=",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/9985f981-8cf7-454c-b4e6-f2357a10183d.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/9985f981-8cf7-454c-b4e6-f2357a10183d.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/9985f981-8cf7-454c-b4e6-f2357a10183d.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/9985f981-8cf7-454c-b4e6-f2357a10183d.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/9985f981-8cf7-454c-b4e6-f2357a10183d.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.beazer.com/9aebacb8-0ae5-4e67-b70a-1dc5ced9600b-c",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.beazer.com/9aebacb8-0ae5-4e67-b70a-1dc5ced9600b-c",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.beazer.com/9aebacb8-0ae5-4e67-b70a-1dc5ced9600b-c",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.beazer.com/81137b0c-c59f-4bc8-8bee-10fab3f70422-c",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.beazer.com/81137b0c-c59f-4bc8-8bee-10fab3f70422-c",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-871009730296594567/original/78ae8eb1-d76a-4669-8583-3085369a9598.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-871009730296594567/original/78ae8eb1-d76a-4669-8583-3085369a9598.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-871009730296594567/original/c5ecf2c4-53c8-4990-8dcb-39b4e51be58d.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-871009730296594567/original/c5ecf2c4-53c8-4990-8dcb-39b4e51be58d.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/90464d07-1628-49e2-a3b4-41f8d44c6d05.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-913871479748193109/original/d5254fee-812b-4570-8df7-245025bde70f.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-913871479748193109/original/d5254fee-812b-4570-8df7-245025bde70f.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-913871479748193109/original/d5254fee-812b-4570-8df7-245025bde70f.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-913871479748193109/original/d5254fee-812b-4570-8df7-245025bde70f.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-913871479748193109/original/d5254fee-812b-4570-8df7-245025bde70f.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/29900e57-fa6e-464e-8aa1-5401ee0ec016.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/29900e57-fa6e-464e-8aa1-5401ee0ec016.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/29900e57-fa6e-464e-8aa1-5401ee0ec016.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/29900e57-fa6e-464e-8aa1-5401ee0ec016.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/29900e57-fa6e-464e-8aa1-5401ee0ec016.jpg?im_w=1200",
        preview: false
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      spotId: {[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]}
    }, {})
  }
};
