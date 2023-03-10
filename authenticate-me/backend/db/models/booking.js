'use strict';

const {Model, Validator} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      );

      Booking.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isBeforeStart(value) {
          if (value.getTime() <= this.startDate.getTime()) {
            let err = new Error("endDate cannot be on or before startDate");
            err.status = 400;
            throw err;
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {},
    scopes: {
      notTheOwner: {
        attributes: {
          exclude: ["id", "userId", "createdAt", "updatedAt"]
        }
      }
    }
  });
  return Booking;
};