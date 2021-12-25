'use strict';

const { CUSTOMERS_TABLE, customerSchema } = require('../models/customer.model')
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMERS_TABLE, {
      id: customerSchema.id,
      firstName: customerSchema.firstName,
      lastName: customerSchema.lastName,
      dateOfBirth: customerSchema.dateOfBirth,
      gender: customerSchema.gender
    }, {
      collate: 'utf8_unicode_ci'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMERS_TABLE);
  }
};
