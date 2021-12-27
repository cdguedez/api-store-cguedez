'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMERS_TABLE } = require('../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMERS_TABLE, 'user_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    })
  },

  down: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMERS_TABLE, 'user_id', {
      unique: false,
      type: DataTypes.INTEGER
    });
  }
};
